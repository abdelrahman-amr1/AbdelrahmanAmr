// Emission Factors based on local/international standards
// Expressed in kg CO2e per unit

export const EMISSION_FACTORS = {
    // Electricity
    electricity: {
        factor: 0.45, // kg CO2e per kWh (Egypt grid average approx)
        unit: 'kWh',
        label: 'الكهرباء'
    },

    // Fuels
    diesel: {
        factor: 2.68, // kg CO2e per Liter
        unit: 'L',
        label: 'السولار'
    },
    gasoline: {
        factor: 2.31, // kg CO2e per Liter
        unit: 'L',
        label: 'البنزين'
    },
    naturalGas: {
        factor: 2.02, // kg CO2e per m3
        unit: 'm3',
        label: 'الغاز الطبيعي'
    },

    // Transport (Simplified per vehicle or total fuel usage)
    // If user enters fuel used by vehicles, we use fuel factors.
    // If they enter distance, we could use distance factors. Here we'll stick to fuel for simplicity.

    // Waste
    generalWaste: {
        factor: 0.4, // kg CO2e per kg of waste sent to landfill
        unit: 'kg',
        label: 'المخلفات العامة'
    },
    medicalWaste: {
        factor: 2.1, // kg CO2e per kg of hazardous/medical waste (incineration)
        unit: 'kg',
        label: 'المخلفات الطبية'
    },
    recycledWaste: {
        factor: 0.05, // Minimal emissions for processing recycled waste
        unit: 'kg',
        label: 'المخلفات المعاد تدويرها'
    },

    // Water
    water: {
        factor: 0.344, // kg CO2e per m3 of supplied water
        unit: 'm3',
        label: 'المياه'
    }
};

/**
 * Calculate emissions for a specific category
 * @param {number} amount - Activity data (e.g., liters, kWh)
 * @param {string} type - Key from EMISSION_FACTORS (e.g., 'electricity')
 * @returns {number} emissions in kg CO2e
 */
export const calculateEmissions = (amount, type) => {
    if (!amount || isNaN(amount)) return 0;

    const category = EMISSION_FACTORS[type];
    if (!category) {
        console.warn(`Emission factor for type ${type} not found.`);
        return 0;
    }

    return Number(amount) * category.factor;
};
