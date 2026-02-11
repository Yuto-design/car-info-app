// src/data/cars.js の例

export const cars = [
    {
        id: '1',
        name: 'プリウス',
        maker: 'トヨタ',
        segment: 'コンパクト',
        bodyType: 'ハッチバック',
        priceMin: 275,
        priceMax: 359,
        fuelType: 'ハイブリッド',
        image: 'https://placehold.co/400x240/1a1a2e/eee?text=Prius',
        description: '世界で愛されるハイブリッドの代表格。燃費と実用性を両立。',
    },
];

export const getCarById = (id) => cars.find((car) => car.id === id);

export const getFeaturedCars = () => cars.slice(0, 4);