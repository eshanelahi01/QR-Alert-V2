import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const db = supabaseAdmin();

  const { data: sticker, error } = await db
    .from("stickers")
    .select("owner_first_name, owner_last_name, owner_phone, plate_number, vehicle_type, vehicle_make, vehicle_model, vehicle_color")
    .eq("qr_code", body.qrCode)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (sticker) {
    const vehicleName = [
      sticker.vehicle_color,
      sticker.vehicle_make,
      sticker.vehicle_model,
      sticker.vehicle_type,
    ].filter(Boolean).join(" ");

    return NextResponse.json({
      exists: true,
      vehicle: {
        ownerName: [sticker.owner_first_name, sticker.owner_last_name].filter(Boolean).join(" "),
        vehicleName: vehicleName || "Registered vehicle",
        numberPlate: sticker.plate_number ?? "Not provided",
        phone: sticker.owner_phone ?? "",
      },
    });
  }

  return NextResponse.json({
    exists: false,
  });
}
