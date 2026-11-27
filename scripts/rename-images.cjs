/**
 * ============================================================================
 * Image Sequential Batch Renamer (Date-Sorted)
 * ============================================================================
 * 
 * ഈ സ്ക്രിപ്റ്റ് ഫോൾഡറിലുള്ള ഇമേജുകളെ അവയുടെ ഡേറ്റ് (Date Created / Modified) 
 * അടിസ്ഥാനമാക്കി ഏറ്റവും പഴയതിൽ നിന്ന് പുതിയതിലേക്ക് (Oldest to Newest) സോർട്ട് ചെയ്ത് 
 * 22, 23, 24... എന്നിങ്ങനെ ക്രമമായി പേര് മാറ്റുന്നു (Rename).
 * 
 * 🚀 എങ്ങനെ റൺ ചെയ്യാം:
 * 1. നേരെ റൺ ചെയ്യാൻ:
 *    node scripts/rename-images.cjs
 * 
 * 2. ഫോൾഡർ പാത്ത് കമാൻഡ് ലൈനിൽ കൊടുത്ത് റൺ ചെയ്യാൻ:
 *    node scripts/rename-images.cjs "public/images/services/New"
 *    node scripts/rename-images.cjs "C:/path/to/your/images"
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// 📁 നിങ്ങള്‍ക്ക് മാറ്റേണ്ട ഫോൾഡർ പാത്ത് ഇവിടെ നൽകാം (Default Path):
const DEFAULT_TARGET_DIR = path.resolve(__dirname, '../public/images/services/Numbers');

// 🔢 പേര് തുടങ്ങേണ്ട നമ്പർ (Start Number):
const START_NUMBER = 22;

// സപ്പോർട്ട് ചെയ്യുന്ന ഇമേജ് ഫോർമാറ്റുകൾ:
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.bmp', '.tiff']);

function runRename() {
  // കമാൻഡ് ലൈൻ ആർഗ്യുമെന്റ് ഉണ്ടെങ്കിൽ അത് എടുക്കുക, ഇല്ലെങ്കിൽ DEFAULT_TARGET_DIR എടുക്കുക
  const targetDirInput = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_TARGET_DIR;

  console.log('\n=============================================================');
  console.log('🖼️  BATCH IMAGE RENAMER (DATE-SORTED)');
  console.log('=============================================================');
  console.log(`📁 Target Folder : ${targetDirInput}`);
  console.log(`🔢 Starting Number: ${START_NUMBER}`);

  if (!fs.existsSync(targetDirInput)) {
    console.error(`\n❌ Error: ഫോൾഡർ കണ്ടെത്താനായില്ല! ദയവായി പാത്ത് പരിശോധിക്കുക:\n   "${targetDirInput}"`);
    process.exit(1);
  }

  // ഫോൾഡറിലെ ഫയലുകൾ റീഡ് ചെയ്യുക
  const allEntries = fs.readdirSync(targetDirInput);
  const imageFiles = [];

  for (const filename of allEntries) {
    const fullPath = path.join(targetDirInput, filename);
    const stat = fs.statSync(fullPath);

    if (stat.isFile()) {
      const ext = path.extname(filename).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        // Windows/Linux Date Handling: creation time അല്ലെങ്കിൽ modification time-ൽ ഏറ്റവും പഴയ സമയം എടുക്കുന്നു
        const birthtime = stat.birthtimeMs && stat.birthtimeMs > 0 ? stat.birthtimeMs : stat.mtimeMs;
        const fileTime = Math.min(birthtime, stat.mtimeMs);

        imageFiles.push({
          originalName: filename,
          fullPath: fullPath,
          ext: ext,
          time: fileTime,
          dateFormatted: new Date(fileTime).toLocaleString('en-IN')
        });
      }
    }
  }

  if (imageFiles.length === 0) {
    console.log('\n⚠️  ഈ ഫോൾഡറിൽ ഇമേജ് ഫയലുകളൊന്നും കണ്ടെത്താനായില്ല.');
    return;
  }

  // 🕒 തീയതി വെച്ച് സോർട്ട് ചെയ്യുന്നു: ഏറ്റവും പഴയ ഫയൽ ആദ്യം (Oldest -> Newest)
  imageFiles.sort((a, b) => a.time - b.time);

  console.log(`\n🔍 കണ്ടെത്തിയ ഇമേജുകൾ: ${imageFiles.length} എണ്ണം.`);
  console.log(`🕒 പഴയ ഫയലുകളിൽ നിന്ന് പുതിയതിലേക്ക് സോർട്ട് ചെയ്തു:\n`);

  // 🛡️ Safe Two-Pass Rename (ഫയലുകൾ പരസ്പരം ഓവർറൈറ്റ് ആവാതിരിക്കാൻ)
  // Step 1: താൽക്കാലിക പേരുകളിലേക്ക് മാറ്റുന്നു (Temporary names)
  const tempMappings = [];
  const timestamp = Date.now();

  for (let i = 0; i < imageFiles.length; i++) {
    const item = imageFiles[i];
    const tempName = `__temp_batch_${timestamp}_${i}${item.ext}`;
    const tempFullPath = path.join(targetDirInput, tempName);

    fs.renameSync(item.fullPath, tempFullPath);
    tempMappings.push({
      tempFullPath,
      targetNumber: START_NUMBER + i,
      ext: item.ext,
      originalName: item.originalName,
      dateFormatted: item.dateFormatted
    });
  }

  // Step 2: ക്രമപ്രകാരമുള്ള ഫൈനൽ നമ്പറുകളിലേക്ക് മാറ്റുന്നു (22, 23, 24...)
  console.log('---------------------------------------------------------------------------------------');
  console.log('| Sl | Original Filename                        | File Date            | New Filename  |');
  console.log('---------------------------------------------------------------------------------------');

  const results = [];
  for (let i = 0; i < tempMappings.length; i++) {
    const item = tempMappings[i];
    const finalName = `${item.targetNumber}${item.ext}`;
    const finalFullPath = path.join(targetDirInput, finalName);

    fs.renameSync(item.tempFullPath, finalFullPath);

    const padSl = String(i + 1).padEnd(2);
    const padOrig = item.originalName.length > 38 
      ? (item.originalName.slice(0, 35) + '...').padEnd(38) 
      : item.originalName.padEnd(38);
    const padDate = item.dateFormatted.padEnd(20);
    const padNew = finalName.padEnd(13);

    console.log(`| ${padSl} | ${padOrig} | ${padDate} | ${padNew} |`);
    results.push({ from: item.originalName, to: finalName });
  }

  console.log('---------------------------------------------------------------------------------------');
  console.log(`\n✅ വിജയം! മൊത്തം ${results.length} ഇമേജുകൾ വിജയകരമായി റീനെയിം ചെയ്തു.`);
  console.log(`🔢 ആരംഭ നമ്പർ : ${START_NUMBER}${imageFiles[0].ext}`);
  console.log(`🔢 അവസാന നമ്പർ: ${START_NUMBER + results.length - 1}${imageFiles[imageFiles.length - 1].ext}`);
  console.log('=============================================================\n');
}

runRename();
