import express, { Router, RequestHandler } from 'express';
import { pool } from '../config/db';

interface CategoryMapping {
  [key: string]: {
    name: string;
    key: string;
  };
}

const categoryMapping: CategoryMapping = {
    "CRYSTAL CHANDELIERS": { name: "Chandeliers", key: "chandeliers" },
    "MODERN DAY CHANDELIERS & PENDANTS": { name: "Pendants & Chandeliers", key: "pendants-chandeliers" },
    "METAL PENDANTS": { name: "Pendants", key: "pendants" },
    "GLASS PENDANTS": { name: "Pendants", key: "pendants" },
    "METAL WIRE/MESH PENDANTS": { name: "Pendants", key: "pendants" },
    "MIXED MEDIA PENDANTS": { name: "Pendants", key: "pendants" },
    "BAMBOO & RATTAN PENDANTS": { name: "Pendants", key: "pendants" },
    "LED PENDANTS": { name: "Pendants", key: "pendants" },
    "LED CEILING FITTINGS CCT, DIMMABLE, 3 ILLUMINATION SETTINGS & NON DIMMABLE": { name: "Surface Mount Fitting", key: "surface-mount" },
    "CEILING FITTINGS": { name: "Surface Mount Fitting", key: "surface-mount" },
    "READING WALL LIGHTS": { name: "Wall Light", key: "wall-light" },
    "DECORATIVE WALL LIGHTS": { name: "Wall Light", key: "wall-light" },
    "PICTURE LIGHTS": { name: "Wall Light", key: "wall-light" },
    "BATHROOM & MIRROR LIGHTS": { name: "Wall Light", key: "wall-light" },
    "COMMERCIAL PENDANTS & SPOT LIGHTS": { name: "Spotlights & Pendants", key: "spotlights-pendants" },
    "FLUORESCENT FITTINGS": { name: "Surface Mount Fitting", key: "surface-mount" },
    "FLOOR LAMPS": { name: "Floor Lamp", key: "floor-lamp" },
    "TABLE LAMPS": { name: "Table Lamp", key: "table-lamp" },
    "RECHARGEABLE TABLE LAMPS": { name: "Table Lamp", key: "table-lamp" },
    "LED & GU10 SURFACE MOUNTED DOWNLIGHTS": { name: "Downlights", key: "downlights" },
    "SPOT LIGHTS": { name: "Spotlights", key: "spotlights" },
    "LED & GU10 TRACK SPOT LIGHTS & ACCESSORIES": { name: "Spotlights", key: "spotlights" },
    "LED DOWNLIGHTS": { name: "Downlights", key: "downlights" },
    "GU10 DOWNLIGHTS": { name: "Downlights", key: "downlights" },
    "LED INDOOR STEP LIGHTS": { name: "Footlight", key: "footlight" },
    "LED OUTDOOR STEP LIGHTS": { name: "Footlight", key: "footlight" },
    "LED ALUMINIUM PROFILES": { name: "Miscellaneous", key: "miscellaneous" },
    "LED STRIP LIGHTS, POWER SUPPLIES & ACCESSORIES": { name: "Miscellaneous", key: "miscellaneous" },
    "LED OUTDOOR LIGHTS": { name: "Exterior", key: "exterior" },
    "OUTDOOR LIGHTS": { name: "Exterior", key: "exterior" },
    "OUTDOOR BULKHEADS": { name: "Exterior", key: "exterior" },
    "OUTDOOR BOLLARDS & SPIKES": { name: "Exterior", key: "exterior" },
    "SOLAR SECURITY LIGHTS": { name: "Exterior", key: "exterior" },
    "INDUSTRIAL LIGHTS": { name: "Industrial", key: "industrial" },
    "LED DECORATIVE BULBS": { name: "Lamps", key: "lamps" },
    "DURALAMP COLLECTION": { name: "Lamps", key: "lamps" },
    "DECORATIVE PLATES FOR CLUSTERS, CEILING CUPS & LAMP HOLDERS": { name: "Miscellaneous", key: "miscellaneous" },
    "METAL HALIDE DOWN LIGHTS": { name: "Downlights", key: "downlights" },
    "COMPACT FLUORESCENT DOWN LIGHTS": { name: "Downlights", key: "downlights" }
};

const router: Router = express.Router();

// List all tables in the database
const listTablesHandler: RequestHandler = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [tables] = await connection.query('SHOW TABLES');
    res.status(200).json({ tables });
  } catch (error) {
    console.error('Error listing tables:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
};

// View table structure
const showTableStructureHandler: RequestHandler = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const tableName = req.params.tableName;
    const [structure] = await connection.query('DESCRIBE ??', [tableName]);
    res.status(200).json({ structure });
  } catch (error) {
    console.error('Error showing table structure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
};

// View table contents
const viewTableContentsHandler: RequestHandler = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const tableName = req.params.tableName;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    
    // Get total count
    const [countResult] = await connection.query(
      'SELECT COUNT(*) as total FROM ??',
      [tableName]
    );
    const total = (countResult as any[])[0].total;

    // Get records with pagination
    const [records] = await connection.query(
      'SELECT * FROM ?? LIMIT ? OFFSET ?',
      [tableName, limit, offset]
    );

    res.status(200).json({
      records,
      pagination: {
        total,
        limit,
        offset,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error viewing table contents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
};

const syncCategoriesHandler: RequestHandler = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    // Get existing categories
    const [categories] = await connection.query('SELECT `key` FROM categories');
    const existingKeys = new Set((categories as any[]).map(cat => cat.key));

    // Prepare unique categories for insertion
    const uniqueCategories = Object.entries(categoryMapping)
      .filter(([_, category]) => !existingKeys.has(category.key))
      .map(([_, category]) => [category.name, category.key]);

    if (uniqueCategories.length > 0) {
      await connection.query(
        'INSERT INTO categories (name, `key`) VALUES ?',
        [uniqueCategories]
      );
    }

    res.status(200).json({ message: 'Categories synchronized successfully' });
  } catch (error) {
    console.error('Error synchronizing categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
};

// Database inspection routes
router.get('/db/tables', listTablesHandler);
router.get('/db/table/:tableName/structure', showTableStructureHandler);
router.get('/db/table/:tableName/contents', viewTableContentsHandler);

// Existing routes
router.post('/syncCategories', syncCategoriesHandler);

export default router; 