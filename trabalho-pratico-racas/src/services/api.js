export const fetchBreeds = async () => {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  if (!response.ok) throw new Error('Falha ao carregar a lista de raças');
  const data = await response.json();
  return Object.keys(data.message);
};

export const fetchBreedImage = async (breed) => {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  if (!response.ok) throw new Error('Falha ao carregar a imagem da raça');
  const data = await response.json();
  return data.message;
};
