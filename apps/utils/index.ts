import axios, { AxiosResponse } from 'axios';
import { NpmModule, NpmModuleInfo, NpmPackageData } from '../../typings';

export function searchNpmModules(keyword?: string): Promise<NpmModule[]> {
  const apiUrl = keyword ? `https://api.npms.io/v2/search?q=${encodeURIComponent(keyword)}` : 'https://api.npms.io/v2/search?q=';
  return axios.get(apiUrl).then((response: AxiosResponse) => response.data.results.map((result: any) => result.package)).catch(() => {
    return [];
  });
}

export async function getNpmPackageDownloads(packageName: string): Promise<number> {
  try {
    const response = await axios.get<NpmPackageData>(`https://api.npmjs.org/downloads/point/last-month/${packageName}`);
    const { downloads } = response.data;
    return downloads || 0;
  } catch (error) {
    return 0;
  }
}

export async function getNpmModuleInfo(moduleName: string): Promise<NpmModuleInfo | null> {
  try {
    const response = await axios.get<NpmModuleInfo>(`https://registry.npmjs.org/${moduleName}`);
    return response.data;
  } catch (error) {
    return null;
  }
}