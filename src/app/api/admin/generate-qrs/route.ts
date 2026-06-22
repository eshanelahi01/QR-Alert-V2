import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomCode(): string {
  let s = "";
  for (let i = 0; i < 4; i++) {
    s += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return `QRA-${s}`;
}

function randomSlug(): string {
  let s = "";
  for (let i = 0; i < 4; i++) {
    s += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return s;
}

// ─────────────────────────────────────────────────────────────
// POST
// ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          error:
            "SUPABASE_SERVICE_ROLE_KEY is missing from environment variables.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();

    const count = Number(body.count ?? 10);
    const base_url = body.base_url;

    if (!base_url) {
      return NextResponse.json(
        {
          error: "base_url is required",
        },
        { status: 400 }
      );
    }

    const batchSize = Math.min(Math.max(count, 1), 200);

    const db = supabaseAdmin();

    // Get existing codes
    const {
      data: existing,
      error: existingErr,
    } = await db
      .from("stickers")
      .select("activation_code, qr_code");

    if (existingErr) {
      console.error("Fetch existing codes error:", existingErr);

      return NextResponse.json(
        {
          error: existingErr.message,
        },
        { status: 500 }
      );
    }

    const usedCodes = new Set(
      (existing || []).map((r) => r.activation_code)
    );

    const usedSlugs = new Set(
      (existing || []).map((r) => r.qr_code)
    );

    const rows: {
      activation_code: string;
      qr_code: string;
      status: string;
      scan_url: string;
    }[] = [];

    let attempts = 0;

    while (
      rows.length < batchSize &&
      attempts < batchSize * 50
    ) {
      attempts++;

      const activation_code = randomCode();
      const qr_code = randomSlug();

      if (
        usedCodes.has(activation_code) ||
        usedSlugs.has(qr_code)
      ) {
        continue;
      }

      const scan_url = `${base_url.replace(/\/$/, "")}/q/${qr_code}`;

      usedCodes.add(activation_code);
      usedSlugs.add(qr_code);

      rows.push({
        activation_code,
        qr_code,
        status: "unactivated",
        scan_url,
      });
    }

    if (!rows.length) {
      return NextResponse.json(
        {
          error: "Failed to generate unique QR codes.",
        },
        { status: 500 }
      );
    }

    const insertRows = rows.map((row) => ({
      activation_code: row.activation_code,
      qr_code: row.qr_code,
      status: row.status,
    }));

    const {
      data: inserted,
      error: insertErr,
    } = await db
      .from("stickers")
      .insert(insertRows)
      .select();

    if (insertErr) {
      console.error("Insert error:", insertErr);

      return NextResponse.json(
        {
          error: insertErr.message,
          details: insertErr,
        },
        { status: 500 }
      );
    }

    console.log(
      `Successfully inserted ${inserted?.length || 0} QR codes`
    );

    return NextResponse.json({
      success: true,
      generated: rows.length,
      codes: rows,
    });
  } catch (err) {
    console.error("Generate QR error:", err);

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown server error",
      },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────
// GET
// ─────────────────────────────────────────────────────────────

export async function GET() {
  try {
    const db = supabaseAdmin();

    const { data, error } = await db
      .from("stickers")
      .select(
        `
        id,
        activation_code,
        qr_code,
        status,
        created_at,
        activated_at,
        owner_first_name,
        plate_number,
        scan_count
      `
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Fetch stickers error:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      stickers: data || [],
    });
  } catch (err) {
    console.error("GET stickers error:", err);

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to fetch stickers",
      },
      { status: 500 }
    );
  }
}