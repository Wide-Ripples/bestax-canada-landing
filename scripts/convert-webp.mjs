import sharp from "sharp";
import { readdirSync, unlinkSync } from "fs";
import { join, extname, basename } from "path";

const dirs = [
  "public/assets/Reviews",
  "public/assets/Logo",
];

for (const dir of dirs) {
  const files = readdirSync(dir);
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

    const input = join(dir, file);
    const outName = basename(file, ext) + ".webp";
    const output = join(dir, outName);

    await sharp(input)
      .webp({ quality: 85, effort: 6 })
      .toFile(output);

    const inSize = (await sharp(input).metadata()).size ?? 0;
    const outInfo = await sharp(output).metadata();
    console.log(`✓ ${file} → ${outName} (${Math.round((outInfo.size ?? 0) / 1024)}KB)`);

    // Remove original after successful conversion
    unlinkSync(input);
  }
}
console.log("Done.");
