# 📦 Client Assets Management Guide

## Overview

The `client_assets/` folder is a special directory designed to store client-provided materials while maintaining repository cleanliness and protecting client privacy.

## 🎯 Purpose

- Store original client-provided materials (photos, documents, brand assets)
- Keep these materials separate from web-ready assets in `public/`
- Maintain privacy by excluding sensitive files from version control
- Preserve folder structure across team members and deployments

## 📁 Folder Structure

```text
client_assets/
├── README.md                           # Documentation (tracked in git)
├── .gitkeep                            # Keeps folder in git (tracked)
├── PLACEHOLDER.txt                     # Instructions (tracked)
├── Lead_By_Example_Assets.zip          # Client assets archive (ignored)
├── Outreach Letter.pdf                 # Client documents (ignored)
├── iCloud Photos from Ronald Hopkins/  # Photo collections (ignored)
└── ...                                 # Other client files (ignored)
```

## ✅ What's Tracked in Git

Only documentation files are committed to version control:

- `README.md` - Explains the folder's purpose
- `.gitkeep` - Ensures the folder exists when cloning
- `PLACEHOLDER.txt` - Instructions for adding client materials

## 🚫 What's Ignored (Not Tracked)

All client materials are excluded via `.gitignore`:

- Photos and images (`.jpg`, `.png`, `.gif`, etc.)
- PDF documents (`.pdf`)
- ZIP archives (`.zip`)
- Design files (`.psd`, `.ai`, `.sketch`, `.fig`)
- Videos (`.mp4`, `.mov`, etc.)
- Audio files (`.mp3`, `.wav`, etc.)

## 🔧 How It Works

### The `.gitignore` Configuration

```gitignore
# Ignore all files in client_assets/
client_assets/*

# Except these documentation files
!client_assets/README.md
!client_assets/.gitkeep
!client_assets/PLACEHOLDER.txt
```

This pattern:

1. Ignores everything in `client_assets/` by default
2. Explicitly includes the three documentation files
3. Allows team members to add client files locally without git tracking them

## 📝 Workflow

### For New Team Members

1. Clone the repository - you'll get the `client_assets/` folder with documentation
2. Contact the client or project lead for access to materials
3. Download and place materials in `client_assets/`
4. Files are automatically ignored by git

### Adding Client Materials

```bash
# Simply copy files to the folder
cp ~/Downloads/client_photos/* client_assets/

# Git will not track them
git status  # Won't show client files as untracked
```

### Using Client Materials

1. **Review**: Examine original materials in `client_assets/`
2. **Optimize**: Resize, compress, and format for web use
3. **Deploy**: Copy optimized versions to `public/` folder
4. **Reference**: Keep originals in `client_assets/` for future needs

### Example Workflow

```bash
# 1. View client photos
ls client_assets/iCloud\ Photos\ from\ Ronald\ Hopkins/

# 2. Optimize for web (example with ImageMagick)
convert client_assets/photo.jpg -resize 1920x1080 -quality 85 public/images/hero-bg.jpg

# 3. Original remains in client_assets/, optimized version in public/
```

## 🛡️ Privacy & Security

### Why This Approach?

- **Privacy**: Client materials may contain sensitive information
- **Repository Size**: Raw photos/videos can be very large (100MB+)
- **Performance**: Keeps git operations fast
- **Control**: Each team member manages their own copy of client materials

### Best Practices

1. **Never commit** client files to git (even accidentally)
2. **Store securely** - use encrypted backups for sensitive materials
3. **Respect copyright** - only use materials as authorized by client
4. **Document usage rights** - note any restrictions on specific files
5. **Regular backups** - client_assets is not backed up by git

## 📚 Current Client Materials

As of the latest update, the `client_assets/` folder contains:

- **Lead_By_Example_Assets.zip** - Archive of all client-provided materials
- **Outreach Letter.pdf** - Official outreach documentation
- **iCloud Photos from Ronald Hopkins/** - Event and community photos
- Additional materials as provided by Lead By Example organization

## 🔄 Syncing with Team

### Option 1: Shared Storage

Use a shared location for client materials:

- Google Drive
- Dropbox
- OneDrive
- Team file server

### Option 2: Direct from Client

Contact the client for materials:

- **Robert McKinney Sr.**
- Lead By Example
- Email: <contact@leadbyexample.org>
- Phone: (401) 699-6544

### Option 3: Project Lead

Request materials from project lead:

- **StrayDog Syndications LLC**
- [@StrayDogSyn](https://github.com/StrayDogSyn)

## 🐛 Troubleshooting

### Issue: Client files showing in git status

**Solution**: Make sure `.gitignore` is properly configured:

```bash
# Check if gitignore is working
git check-ignore -v client_assets/photo.jpg

# Should output:
# .gitignore:91:client_assets/*    client_assets/photo.jpg
```

### Issue: Accidentally committed client files

**Solution**: Remove from git history:

```bash
# Remove file but keep locally
git rm --cached client_assets/secret-file.pdf

# Commit the removal
git commit -m "Remove accidentally committed client file"
```

### Issue: Folder not appearing after clone

**Solution**: The `.gitkeep` file ensures it appears. If missing:

```bash
# Verify gitkeep is tracked
git ls-files client_assets/

# Should show:
# client_assets/.gitkeep
# client_assets/PLACEHOLDER.txt
# client_assets/README.md
```

## 📊 File Size Recommendations

When adding client materials:

| File Type          | Recommended Max Size | Notes                                 |
| ------------------ | -------------------- | ------------------------------------- |
| Photos (originals) | 25 MB each           | Keep high-res originals here          |
| Videos             | 500 MB each          | Consider cloud storage for larger     |
| PDFs               | 10 MB each           | Compress if needed                    |
| ZIP archives       | 100 MB               | Break into smaller archives if larger |

## 🎨 Preparing Assets for Production

### Images

```bash
# Optimize for web
npm install -g sharp-cli

sharp -i client_assets/photo.jpg \
      -o public/images/optimized.jpg \
      --resize 1920 \
      --quality 85
```

### Documents

- Convert PDFs to images if needed for previews
- Extract text content for accessibility
- Create thumbnails for document links

## 📞 Support

For questions about client assets:

1. Check `client_assets/README.md` for current status
2. Review `client_assets/PLACEHOLDER.txt` for instructions
3. Contact project lead or client directly
4. See main [README.md](../README.md) for project contacts

---

**Last Updated**: November 4, 2025  
**Maintained By**: StrayDog Syndications LLC  
**Project**: Lead By Example Website
