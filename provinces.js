// ============================================================
// DATA 38 IBUKOTA PROVINSI INDONESIA
// ============================================================

const provincesData = {
    // ===== SUMATERA (10) =====
    'aceh': {
        name: 'Aceh',
        capital: 'Banda Aceh',
        adm4: '11.71.01.1001'
    },
    'sumatera-utara': {
        name: 'Sumatera Utara',
        capital: 'Medan',
        adm4: '12.71.01.1001'
    },
    'sumatera-barat': {
        name: 'Sumatera Barat',
        capital: 'Padang',
        adm4: '13.71.01.1001'
    },
    'riau': {
        name: 'Riau',
        capital: 'Pekanbaru',
        adm4: '14.71.01.1001'
    },
    'jambi': {
        name: 'Jambi',
        capital: 'Jambi',
        adm4: '15.71.01.1001'
    },
    'sumatera-selatan': {
        name: 'Sumatera Selatan',
        capital: 'Palembang',
        adm4: '16.71.01.1001'
    },
    'bengkulu': {
        name: 'Bengkulu',
        capital: 'Bengkulu',
        adm4: '17.71.01.1001'
    },
    'lampung': {
        name: 'Lampung',
        capital: 'Bandar Lampung',
        adm4: '18.71.01.1001'
    },
    'bangka-belitung': {
        name: 'Bangka Belitung',
        capital: 'Pangkal Pinang',
        adm4: '19.71.01.1001'
    },
    'kepulauan-riau': {
        name: 'Kepulauan Riau',
        capital: 'Tanjung Pinang',
        adm4: '21.71.01.1001'
    },

    // ===== JAWA (6) =====
    'dki-jakarta': {
        name: 'DKI Jakarta',
        capital: 'Jakarta',
        adm4: '31.71.03.1001'
    },
    'jawa-barat': {
        name: 'Jawa Barat',
        capital: 'Bandung',
        adm4: '32.73.01.1001'
    },
    'jawa-tengah': {
        name: 'Jawa Tengah',
        capital: 'Semarang',
        adm4: '33.74.01.1001'
    },
    'di-yogyakarta': {
        name: 'DI Yogyakarta',
        capital: 'Yogyakarta',
        adm4: '34.71.01.1001'
    },
    'jawa-timur': {
        name: 'Jawa Timur',
        capital: 'Surabaya',
        adm4: '35.78.01.1001'
    },
    'banten': {
        name: 'Banten',
        capital: 'Serang',
        adm4: '36.73.01.1001'
    },

    // ===== BALI & NUSA TENGGARA (3) =====
    'bali': {
        name: 'Bali',
        capital: 'Denpasar',
        adm4: '51.71.01.1001'
    },
    'nusa-tenggara-barat': {
        name: 'Nusa Tenggara Barat',
        capital: 'Mataram',
        adm4: '52.71.01.1001'
    },
    'nusa-tenggara-timur': {
        name: 'Nusa Tenggara Timur',
        capital: 'Kupang',
        adm4: '53.71.01.1001'
    },

    // ===== KALIMANTAN (5) =====
    'kalimantan-barat': {
        name: 'Kalimantan Barat',
        capital: 'Pontianak',
        adm4: '61.71.01.1001'
    },
    'kalimantan-tengah': {
        name: 'Kalimantan Tengah',
        capital: 'Palangka Raya',
        adm4: '62.71.01.1001'
    },
    'kalimantan-selatan': {
        name: 'Kalimantan Selatan',
        capital: 'Banjarmasin',
        adm4: '63.71.01.1001'
    },
    'kalimantan-timur': {
        name: 'Kalimantan Timur',
        capital: 'Samarinda',
        adm4: '64.71.01.1001'
    },
    'kalimantan-utara': {
        name: 'Kalimantan Utara',
        capital: 'Tanjung Selor',
        adm4: '65.71.01.1001'
    },

    // ===== SULAWESI (6) =====
    'sulawesi-utara': {
        name: 'Sulawesi Utara',
        capital: 'Manado',
        adm4: '71.71.01.1001'
    },
    'sulawesi-tengah': {
        name: 'Sulawesi Tengah',
        capital: 'Palu',
        adm4: '72.71.01.1001'
    },
    'sulawesi-selatan': {
        name: 'Sulawesi Selatan',
        capital: 'Makassar',
        adm4: '73.71.01.1001'
    },
    'sulawesi-tenggara': {
        name: 'Sulawesi Tenggara',
        capital: 'Kendari',
        adm4: '74.71.01.1001'
    },
    'gorontalo': {
        name: 'Gorontalo',
        capital: 'Gorontalo',
        adm4: '75.71.01.1001'
    },
    'sulawesi-barat': {
        name: 'Sulawesi Barat',
        capital: 'Mamuju',
        adm4: '76.71.01.1001'
    },

    // ===== MALUKU (2) =====
    'maluku': {
        name: 'Maluku',
        capital: 'Ambon',
        adm4: '81.71.01.1001'
    },
    'maluku-utara': {
        name: 'Maluku Utara',
        capital: 'Sofifi',
        adm4: '82.71.01.1001'
    },

    // ===== PAPUA (6) =====
    'papua': {
        name: 'Papua',
        capital: 'Jayapura',
        adm4: '91.71.01.1001'
    },
    'papua-barat': {
        name: 'Papua Barat',
        capital: 'Manokwari',
        adm4: '92.71.01.1001'
    },
    'papua-selatan': {
        name: 'Papua Selatan',
        capital: 'Merauke',
        adm4: '93.71.01.1001'
    },
    'papua-tengah': {
        name: 'Papua Tengah',
        capital: 'Nabire',
        adm4: '94.71.01.1001'
    },
    'papua-pegunungan': {
        name: 'Papua Pegunungan',
        capital: 'Wamena',
        adm4: '95.71.01.1001'
    },
    'papua-barat-daya': {
        name: 'Papua Barat Daya',
        capital: 'Sorong',
        adm4: '96.71.01.1001'
    }
};

// ============================================================
// FUNGSI
// ============================================================

function getProvinceData(key) {
    return provincesData[key] || null;
}

function getAllProvinces() {
    return Object.keys(provincesData).map(key => ({
        key: key,
        ...provincesData[key]
    }));
}

function searchProvince(query) {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const keys = Object.keys(provincesData);
    let exact = null;
    let partial = null;

    for (const key of keys) {
        const p = provincesData[key];
        const pName = p.name.toLowerCase();
        const cName = p.capital.toLowerCase();

        // Exact match
        if (key === q || pName === q || cName === q) {
            exact = key;
            break;
        }

        // Partial match
        if (pName.includes(q) || cName.includes(q)) {
            if (!partial) partial = key;
        }
    }

    return exact || partial || null;
}

// Ekspor
window.provincesData = provincesData;
window.getProvinceData = getProvinceData;
window.getAllProvinces = getAllProvinces;
window.searchProvince = searchProvince;

console.log(`🏝️ ${Object.keys(provincesData).length} ibukota provinsi dimuat!`);