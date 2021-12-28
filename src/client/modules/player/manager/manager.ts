export const DICTIONARY = 'mp_clothing@female@shirt';
export const ANIMATION = 'try_shirt_positive_a';

let camera: number;
let currentPage = 1;

export const getCurrentPage = (): number => currentPage;
export const getCamera = (): number => camera;

export const setCurrentPage = (newPage: number) => (currentPage = newPage);
export const setCamera = (newCamera: number) => (camera = newCamera);
