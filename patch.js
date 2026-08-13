const fs = require('fs');
let code = fs.readFileSync('/home/rivzhent/project/cafe_project/frontend/script.js', 'utf8');

code = code.replace(/document\.querySelectorAll\("\.kartu-menu-1"\)/g, 'document.querySelectorAll("#menu-container .kartu-menu-1")');
code = code.replace(/document\.querySelectorAll\("\.pilihan-1"\)/g, 'document.querySelectorAll("#menu .pilihan-1")');
code = code.replace(/document\.querySelectorAll\("\.kategori-wrapper a"\)/g, 'document.querySelectorAll("#menu .kategori-wrapper a")');
code = code.replace(/document\.querySelectorAll\("\.sub-menu"\)/g, 'document.querySelectorAll("#menu .sub-menu")');
code = code.replace(/document\.querySelectorAll\("\.sliding-highlight"\)/g, 'document.querySelectorAll("#menu .sliding-highlight")');
code = code.replace(/document\.querySelector\('\.kategori-wrapper a\.active-kategori'\)/g, 'document.querySelector(\'#menu .kategori-wrapper a.active-kategori\')');
code = code.replace(/document\.querySelector\("\.kategori-wrapper a\.active-kategori"\)/g, 'document.querySelector("#menu .kategori-wrapper a.active-kategori")');
code = code.replace(/document\.querySelector\("\.sub-menu:not\(\.hidden\)"\)/g, 'document.querySelector("#menu .sub-menu:not(.hidden)")');
code = code.replace(/document\.querySelector\('\.kategori-wrapper a\\[data-target="(.*?)"\\]'\)/g, 'document.querySelector(\'#menu .kategori-wrapper a[data-target="$1"]\')');
code = code.replace(/document\.querySelector\(`\.kategori-wrapper a\\[data-target="\${(.*?!})}"\\]`\)/g, 'document.querySelector(`#menu .kategori-wrapper a[data-target="${$1}"]`)');
code = code.replace(/document\.querySelector\(`\.sub-menu a\\[data-filter="\${(.*?!})}"\\]`\)/g, 'document.querySelector(`#menu .sub-menu a[data-filter="${$1}"]`)');
code = code.replace(/document\.querySelector\("\.sub-menu:not\(\.hidden\) \.pilihan-1\.active"\)/g, 'document.querySelector("#menu .sub-menu:not(.hidden) .pilihan-1.active")');

fs.writeFileSync('/home/rivzhent/project/cafe_project/frontend/script.js', code);
console.log("Patched successfully!");
