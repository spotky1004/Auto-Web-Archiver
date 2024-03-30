import path from "path";
import { readdir, stat } from "fs/promises";

/**
 * @param {string} path 
 */
export default async function dirSize(dirPath) {
  const files = await readdir( dirPath );
  const stats = files.map( file => stat( path.join( dirPath, file ) ) );

  return ( await Promise.all( stats ) ).reduce( ( accumulator, { size } ) => accumulator + size, 0 );
}
