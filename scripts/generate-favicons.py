from PIL import Image

dark = Image.open('public/clyvuum-logo-dark.png').convert('RGBA')

# favicon.ico with 16, 32, 48
img16 = dark.resize((16, 16), Image.LANCZOS)
img32 = dark.resize((32, 32), Image.LANCZOS)
img48 = dark.resize((48, 48), Image.LANCZOS)
img48.save('public/favicon.ico', format='ICO', sizes=[(16,16),(32,32),(48,48)], append_images=[img16, img32])
print("favicon.ico done")

# apple-touch-icon 180x180
apple = Image.new('RGBA', (180, 180), (10, 10, 10, 255))
logo = dark.resize((140, 140), Image.LANCZOS)
apple.paste(logo, (20, 20), logo)
apple.save('public/apple-touch-icon.png')
print("apple-touch-icon.png done")

# web manifest icons
for s in [192, 512]:
    icon = Image.new('RGBA', (s, s), (10, 10, 10, 255))
    ls = int(s * 0.75)
    lr = dark.resize((ls, ls), Image.LANCZOS)
    o = (s - ls) // 2
    icon.paste(lr, (o, o), lr)
    icon.save(f'public/icon-{s}.png')
    print(f"icon-{s}.png done")

# PNG favicons
dark.save('public/favicon-32x32.png')
dark.resize((16, 16), Image.LANCZOS).save('public/favicon-16x16.png')
print("favicon PNGs done")
print("All done!")
