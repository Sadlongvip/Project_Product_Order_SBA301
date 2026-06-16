-- =============================================
-- SEED DATA: Category + Item
-- Run this in SQL Server Management Studio
-- =============================================

-- 1. Insert Category first (Item has FK to Category)
-- category_id: 1 = Home Appliances, 2 = Kitchen Tools, 3 = Accessories
INSERT INTO Category (name) VALUES
    ('Home Appliances'),
    ('Kitchen Tools'),
    ('Accessories');

-- 2. Insert 5 sample Items (update image path later)
-- category_id: 1 = Home Appliances, 2 = Kitchen Tools, 3 = Accessories
INSERT INTO Item (name, description, price, image, stock, category_id) VALUES
(
    'Rice Cooker',
    'Electric rice cooker with modern technology, cooks rice quickly and evenly.',
    199000.00,
    'image.png',
    50,
    1
),
(
    'Red Glass Bottle',
    'Red glass bottle with lid, made of safe and durable material.',
    349000.00,
    'image_2.png',
    30,
    1
),
(
    'Electric Kettle',
    'Electric kettle with large capacity, good heat retention, premium material.',
    459000.00,
    'image_3.png',
    40,
    2
),
(
    'Pot and Pan Set',
    'Multi-size pot and pan set, non-stick alloy material, easy to clean.',
    249000.00,
    'image_4.png',
    60,
    2
),
(
    'Snapback Cap',
    'Unisex snapback cap with streetwear style, adjustable strap for all head sizes.',
    149000.00,
    'image_5.png',
    80,
    3
);

-- Check result
SELECT i.id, i.name, i.price, i.stock, c.name AS category
FROM Item i
JOIN Category c ON i.category_id = c.id;
