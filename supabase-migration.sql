-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(255) NOT NULL,
  name VARCHAR(500) NOT NULL,
  price VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);

-- Insert menu data
INSERT INTO menu_items (category, name, price, description) VALUES
('SALAD', 'CLASSIC CAESAR SALAD VEG/CHICKEN', '555/585', 'Romaine lettuce and croutons dressed with lemon juice, olive oil,Worcestershire sauce, garlic, Dijon mustard, Parmesan and black pepper.'),
('SALAD', 'SOM TAM SALAD VEG/PRAWN', '545/605', 'Raw papaya, carrot, beans, Toasted Peanut & Thai Red Chili sauce'),
('SALAD', 'THE GREEN FIX', '555', 'A refreshing of greens with silky avocado and herb-packed coriander sauce.'),
('ASIAN', 'BURNT GARLIC AND CHILLI BASIL PANEER', '595', 'Smoky whispers, herby hugs, and chilli heat paneer'),
('ASIAN', 'CRISPY HONEY CHILLI LOTUS MEDALLIONS', '495', 'Each medallion hits like a sweet-spicy sonnet in crunch form'),
('ASIAN', 'SALT AND PEPPER MUSHROOM', '525', 'Crunchy caps, peppery pops.'),
('ASIAN', 'SPICE GLAZED CRUNCHY WATER CHESTNUT', '495', 'Crunch that crackles, spice that dazzles.'),
('ASIAN', 'KUNG PAO BROCCOLI', '575', 'Sweet, spicy,  crunch, and just the right punch.'),
('ASIAN', 'CHILLI GARLIC EDAMAME', '495', 'Steamed edamame tossed in spicy chili garlic sauce.'),
('INDIAN', 'PALAK PATTA CHAAT', '475', 'CRISPY SPINACH WITH WHIPPED SWEET YOGURT IN HOUSE MASALA'),
('INDIAN', 'AVOCADO DAHI PURI SHOTS', '525', 'PURI STUFFED WITH AVACADO MASH CRIPSY MOONG DAL AND SEV WITH SWEET AND SOUR CHUTNEY AND YOGURT'),
('INDIAN', 'LAHORI PANEER TIKKA', '595', 'TANDOORI PANEER TIKKA LAHORE-STYLE, WITH MINT CHUTNEY AND LACCHA PYAAZ ON THE SIDE.'),
('INDIAN', 'NAWABI MALAI BROCCOLI FLORETS', '575', ''),
('INDIAN', 'TANDOORI VEG MOMO', '605', ''),
('MEDITERRANEAN', 'JOLOKIA MUSHROOM', '495', 'Fire-roasted mushrooms finished with a touch of ghost chilli heat and aromatic herbs.'),
('MEDITERRANEAN', 'HUMMUS', '475', 'Chickpea puree with sesame paste, garlic, lemon juice, topped with chickpeas and parselyy, drizzled with extra virgin olive oil, served With fresh pita bread'),
('MEDITERRANEAN', 'GREEN CHILLY HUMMUS', '475', 'Chickpea puree with sesame paste, garlic, green chilli, mint, lemon juice, topped with chickpeas and parsely, drizzled with extra virgin olive oil, served with fresh pita bread'),
('MEDITERRANEAN', 'MOUTABAL', '475', 'Grilled aubergine mixed with sesame paste, fresh lemon juice topped with sumac and extra virgin olive oil, served with fresh pita bread'),
('MEDITERRANEAN', 'MOHAMMARA', '475', 'roasted red pepper,walnut,pomegranate molasses with fresh pita bread'),
('MEDITERRANEAN', 'MEZZE PLATTER', '775', 'classic hummus,moutabal,mohammara,marinated olives,in veg house pickle, falafel,  fresh pita bread.'),
('MEDITERRANEAN', 'GRILLED COTTAGE CHEESE', '595', 'Harissa spice paneer, house salad, garlic toum.'),
('MEDITERRANEAN', 'FRIED AVOCADO BAO', '495', ''),
('MEDITERRANEAN', 'TANDOORI PANEER BAO', '515', ''),
('MEDITERRANEAN', 'AVOCADO CROSTINI', '495', ''),
('ASIAN', 'SILK ROAD CUMIN LAMB', '715', 'Skin-numbing cumin and chilli dust, tender lamb'),
('ASIAN', 'PAN-SEARED SNAPPER CHILLI WINE GLAZE', '685', 'Snapper with attitude: fiery chilli and a smooth chinese wine twist.'),
('ASIAN', 'THOUSAND CHILLI FIREBIRD', '655', 'Corn fed chicken with lots of chillis'),
('ASIAN', 'KUNG PAO CHICKEN', '655', 'Wok-fired heat meets juicy chicken in every spicy bite.'),
('ASIAN', 'DRY WOK CHICKEN THREADS', '655', 'Tender chicken Crisp scallions No sauce, all flavour.'),
('ASIAN', 'CHICKEN YAKITORI', '675', 'Charcoal grilled chicken skewered, seasoned with sweet and salty teriyaki sauce'),
('ASIAN', 'SPICY CHICKEN WINGS', '715', ''),
('INDIAN', 'THE TANDOOR CROWN CHICKEN', '655', 'CLASSIC CHICKEN TIKKA SERVED WITH MINT CHUTNEY LACCHA PYAAZ'),
('INDIAN', 'ACHARI FISH TIKKA', '685', 'PICKLED SPICE MARINATED FISH WITH MINT CHUTNEY LACCHA PYAAZ'),
('INDIAN', 'PRAWN GHEE ROAST WITH SET DOSA', '735', 'PRAWNS TOSSED WITH GHEE ROAST MASALA TOPPED WITH CURRY LEAF'),
('INDIAN', 'INDORI MUTTON SEEKH KABAB SERVED WITH LACHA PYAAZ AND MINT CHUTNEY', '715', 'HAND POUNDED LAMB MINCE MARINATED WITH RED CHILLY AND FRESH HERB COOKED OVER CHARCOAL'),
('INDIAN', 'MURADABADI CHICKEN SEEKH KABAB SERVED WITH LACHA PYAAZ AND MINT CHUTNEY', '675', 'CHICKEN MINCE MARINATED WITH IN HOUSE SPICE BLEND COOKED OVER CHARCOAL.'),
('INDIAN', 'SOUTH STYLE CHILLY CHICKEN', '655', 'BONELESS CHICKEN COOKED WITH GREEN CHILLY AND GARLIC'),
('INDIAN', 'GUNTUR CHICKEN WITH NOOL PARATHA', '675', 'CHICKEN THIGH COOKED WITH GUNTUR CHILLY AND GARLIC SERVED WITH FLAKY PARATHA'),
('INDIAN', 'TAWA MUTTON SEEKH', '715', 'MUTTON SHEEK TOSSED WITH ONION TOMATO MASALA AND GREEN CHILLY SERVED WITH MINT CHUTNEY'),
('INDIAN', 'TAWA CHICKEN SEEKH', '685', 'CHICKEN SHEEK TOSSED WITH ONION TOMATO MASALA AND GREEN CHILLY SERVED WITH MINT CHUTNEY'),
('INDIAN', 'ANDHRA CHILLY ANDAA', '495', ''),
('INDIAN', 'LASOONI MURGH TIKKA', '655', 'CHICKEN TIGH MARINATED IN HOUSE GARLIC MASALA FLASH COOKED IN TANDOOR SERVED WITH  MINT CHUTNEY'),
('INDIAN', 'PRAWN VEPUDU', '725', ''),
('PRAWNS TOSSED IN SOUTH INDIAN MASALA', 'BUTTER CHICKEN WINGS WITH GREEN CHILLI MAYO', '715', ''),
('PRAWNS TOSSED IN SOUTH INDIAN MASALA', 'AFGHANI MALAI MURGH TIKKA', '655', ''),
('PRAWNS TOSSED IN SOUTH INDIAN MASALA', 'TANDOORI CHICKEN MOMO', '655', ''),
('PRAWNS TOSSED IN SOUTH INDIAN MASALA', 'DESI CHATPATA CHICKEN DELIGHT', '655', ''),
('PRAWNS TOSSED IN SOUTH INDIAN MASALA', 'TANDOORI CHICKEN BAO', '655', ''),
('MEDITERRANEAN', 'ADANA CHICKEN SHEEK', '655', 'Chicken mince flavoured with turkish spice and red bell pepper, charcoal grilled served with sumac onion'),
('MEDITERRANEAN', 'ADANA MUTTON SHEEK', '715', 'lamb mince flavoured with turkish spice and red bell pepper, charcoal grilled served with sumac onion'),
('MEDITERRANEAN', 'SHAWARMA CHICKEN  HUMMUS', '675', 'With BBQ chicken , chimichurri, shallot relish and pita bread'),
('MEDITERRANEAN', 'TURKISH TAVA KARIDES', '695', 'small prawns tossed with olive oil garlic, baharat spice,fresh parsely and chilly flakes served with hot khaboos.'),
('VEG', 'BLACK DIAMOND CREAM CHEESE', '575', 'Decadent truffle-infused cream cheese with a silky, crystal-smooth texture.'),
('VEG', 'VEG CRYSTAL DUMPLING', '555', 'Light and elegant dumplings with finely chopped vegetables wrapped in a crystal-clear skin.'),
('N.VEG', 'CORIANDER BURST CHICKEN DUMPLINGS', '655', 'Juicy chicken dumplings enhanced with the bright, herbaceous kick of fresh coriander.'),
('N.VEG', 'CHICKEN GYOZA', '655', 'Japanese-style pan-seared dumplings filled with seasoned chicken and aromatics, served with soy dipping sauce.'),
('VEG', 'FARM HOUSE', '735', 'A garden-fresh delight loaded with crunchy veggies, cheese and tomato basil sauce .'),
('VEG', 'PERI PERI PANEER', '735', 'A fusion of Indian paneer and African peri peri heat on a cheesy crust.'),
('VEG', 'CLASSIC MARGARITA', '735', 'Garden-fresh basil, rich tomato sauce and melty mozzarella simple and satisfying.'),
('VEG', 'ROYAL MASALA  PIZZA', '735', 'India's favorite curry gets a pizza makeover with veggies and cheese'),
('VEG', 'CHEESY MAKHANI MADNESS', '735', 'Creamy butter makhani gravy loaded with garden-fresh veggies and melted cheese.'),
('N.VEG', 'PERI PERI CHICKEN', '775', 'A fusion of chicken and African peri peri heat on a cheesy crust.'),
('N.VEG', 'ROYAL MASALA  PIZZA', '775', 'India's favorite curry gets a pizza makeover with chicken tikka and cheese'),
('N.VEG', 'MAKHANI CRUST AFFAIR', '775', 'A love story between juicy chicken, buttery gravy, and melted cheese.'),
('N.VEG', 'DRAGON CRUST', '775', 'A blazing hot combo of chilli chicken and bubbling cheese.'),
('ASIAN', 'MALA EMBER STIR-FRY VEGGIES', '585', 'A fiery stir-fry of veggies, tofu, and young spinach tossed in bold Mala sauce.'),
('ASIAN', 'MAPO TOFU SOY MINCE SICHUAN PEPPER OIL', '585', 'Silky tofu with soy mince in a bold, spicy Sichuan pepper oil sauce'),
('ASIAN', 'SEASONAL VEG IN BLACK BEAN CORIANDER SAUCE', '585', 'Stir-fried seasonal greens in a fragrant black bean and coriander glaze.'),
('ASIAN', 'GREEN CURRY VEG', '625', 'Fresh vegetables in a velvety green curry infused with lemongrass, kaffir lime and coconut -based.'),
('ASIAN', 'RED CURRY VEG', '625', 'Rich and creamy red curry with fresh seasonal vegetables.'),
('INDIAN', 'MARTABAN KE CHOLE WITH KARARA KULCHA SERVED WITH LACHA PYAAZ', '615', 'Masala-packed chole, kulcha with crunch, and onions with a tangy twist'),
('INDIAN', 'SHAHI KOFTA CURRY', '585', 'Luxurious dumplings simmered in a velvety saffron-kissed gravy.'),
('INDIAN', 'PANEER BUTTER MASALA', '615', 'Cottage cheese cubes in a rich, buttery tomato gravy with a hint of cream.'),
('INDIAN', 'DAL MAKHANI WITH LACHA PARATHA', '595', 'Buttery black dal simmered overnight, served with crisp, golden paratha.'),
('INDIAN', 'GONGURA PANEER MALAI CURRY WITH FRIED CASHEW, LACHA PARATHA', '625', 'CLASSIC METHI MALAI GRAVY WITH GONGURA PICKLE/FRIED CASHEW/TANDOORI LACHA PARATHA'),
('INDIAN', 'MIX VEG TAWA MASALA', '585', ''),
('INDIAN', 'MUSHROOM DO PYAZA', '615', ''),
('INDIAN', 'KADAI PANEER', '615', '');

-- Enable RLS (Row Level Security) if needed
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON menu_items
  FOR SELECT USING (true);

-- Create policy to allow authenticated users (admin) to update
CREATE POLICY "Allow authenticated users to update" ON menu_items
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users (admin) to insert
CREATE POLICY "Allow authenticated users to insert" ON menu_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
