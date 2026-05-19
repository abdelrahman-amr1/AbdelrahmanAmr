const COMPETITOR_CARS = [
    // --- Luxury / VIP (For Wedding & Business) ---
    {
        id: 'vic-1',
        name: 'Mercedes S-Class 2024',
        type: 'Luxury',
        price: 8500,
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80',
        rating: 5.0,
        engine: '3.0L V6 Turbo',
        speed: '250 km/h',
        seats: '4'
    },
    {
        id: 'vic-2',
        name: 'Porsche Panamera 2024',
        type: 'Luxury',
        price: 9500,
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80',
        rating: 5.0,
        engine: '4.0L V8',
        speed: '315 km/h',
        seats: '4'
    },
    {
        id: 'vic-3',
        name: 'Audi A6 2024',
        type: 'Luxury',
        price: 6500,
        image: 'https://images.unsplash.com/photo-1606159068539-43f36b99d1b2?auto=format&fit=crop&q=80',
        rating: 4.8,
        engine: '2.0L Turbo',
        speed: '240 km/h',
        seats: '5'
    },
    {
        id: 'vic-4',
        name: 'Volvo S90',
        type: 'Luxury',
        price: 5500,
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80',
        rating: 4.9,
        engine: '2.0L AWD',
        speed: '210 km/h',
        seats: '5'
    },

    // --- Family / SUV (For Trips) ---
    {
        id: 'vic-5',
        name: 'Toyota Land Cruiser 300',
        type: 'SUV',
        price: 7500,
        image: 'https://images.unsplash.com/photo-1550064824-8f993041ffd3?auto=format&fit=crop&q=80',
        rating: 5.0,
        engine: '3.5L Twin Turbo',
        speed: '210 km/h',
        seats: '7'
    },
    {
        id: 'vic-6',
        name: 'Mitsubishi Xpander',
        type: 'SUV',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1609521262049-b49e8dca3bcf?auto=format&fit=crop&q=80',
        rating: 4.7,
        engine: '1.5L MIVEC',
        speed: '180 km/h',
        seats: '7'
    },
    {
        id: 'vic-7',
        name: 'Toyota Fortuner 2024',
        type: 'SUV',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1625231334861-d0027170195e?auto=format&fit=crop&q=80',
        rating: 4.8,
        engine: '2.8L Diesel',
        speed: '190 km/h',
        seats: '7'
    },

    // --- Van / Limousine (For Airport Transfer) ---
    {
        id: 'vic-8',
        name: 'Toyota Hiace VIP',
        type: 'Van',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1581235720704-06d3acfc13b7?auto=format&fit=crop&q=80',
        rating: 4.9,
        engine: '2.5L Turbo',
        speed: '160 km/h',
        seats: '14'
    },
    {
        id: 'vic-9',
        name: 'Hyundai H1',
        type: 'Van',
        price: 2800,
        image: 'https://images.unsplash.com/photo-1600191839633-8020227c2f1d?auto=format&fit=crop&q=80',
        rating: 4.7,
        engine: '2.4L MPi',
        speed: '170 km/h',
        seats: '9'
    },

    // --- Economy (Generic) ---
    {
        id: 'vic-10',
        name: 'Toyota Corolla 2024',
        type: 'Economy',
        price: 2200,
        image: 'https://images.unsplash.com/photo-1623860840536-a382b32402fd?auto=format&fit=crop&q=80',
        rating: 4.8,
        engine: '1.8L Hybrid',
        speed: '200 km/h',
        seats: '5'
    },
    {
        id: 'vic-11',
        name: 'Nissan Sunny 2024',
        type: 'Economy',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?auto=format&fit=crop&q=80',
        rating: 4.6,
        engine: '1.5L',
        speed: '175 km/h',
        seats: '5'
    }
];

const COMPETITOR_DRIVERS = [
    { id: 'dr-1', name: 'أحمد محمد', rating: 4.9, image: 'https://i.pravatar.cc/150?u=dr1' },
    { id: 'dr-2', name: 'سيد علي', rating: 4.8, image: 'https://i.pravatar.cc/150?u=dr2' },
    { id: 'dr-3', name: 'محمود حسن', rating: 5.0, image: 'https://i.pravatar.cc/150?u=dr3' }
];

function getCars() { return COMPETITOR_CARS; }
function getDrivers() { return COMPETITOR_DRIVERS; }
