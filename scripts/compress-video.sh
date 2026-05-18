#!/usr/bin/env bash
# Compress a raw Higgsfield video into web-ready WebM + MP4 + poster.
# Usage: scripts/compress-video.sh path/to/raw.mp4 hero
#   $1 = source file
#   $2 = output basename (e.g. "hero" or "cinemagraph")
set -euo pipefail

SRC="${1:?usage: $0 <source-video> <basename>}"
NAME="${2:?usage: $0 <source-video> <basename>}"
OUT_DIR="public/media"
mkdir -p "$OUT_DIR"

# Mute the audio track; we don't want sound on a hero loop.
# Target ~3.5 MB for the WebM; H.264 MP4 fallback similar size.
echo "→ WebM (VP9)"
ffmpeg -y -i "$SRC" \
  -an \
  -c:v libvpx-vp9 -b:v 0 -crf 36 \
  -vf "scale='min(1920,iw)':-2,fps=30" \
  -row-mt 1 -threads 4 -tile-columns 2 -frame-parallel 1 \
  -deadline good -cpu-used 2 \
  "$OUT_DIR/$NAME.webm"

echo "→ MP4 (H.264)"
ffmpeg -y -i "$SRC" \
  -an \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
  -vf "scale='min(1920,iw)':-2,fps=30" \
  -movflags +faststart \
  "$OUT_DIR/$NAME.mp4"

echo "→ Poster JPG"
ffmpeg -y -ss 00:00:01 -i "$SRC" -frames:v 1 -update 1 -q:v 3 \
  "$OUT_DIR/$NAME-poster.jpg"

ls -lh "$OUT_DIR/$NAME".*
