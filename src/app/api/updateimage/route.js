import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export async function POST(x    ) {

  const form = new formidable.IncomingForm();

  // Parse the form data
  const data = await new Promise((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const { productId } = data.fields;
  const imgFile = data.files.img[0];

  // Save image to a directory
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const imgPath = path.join(uploadDir, imgFile.originalFilename);
  fs.renameSync(imgFile.filepath, imgPath);

  const imgUrl = `/uploads/${imgFile.originalFilename}`;

  try {
    const query = `
      UPDATE products
      SET img = $1
      WHERE id = $2
      RETURNING *
    `;
    const values = [imgUrl, productId];

    const result = await pool.query(query, values);

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error updating product image:', error);
    return NextResponse.json(
      { error: error.message, msg: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Necessary for Formidable to work
export const config = {
  api: {
    bodyParser: false
  }
};
