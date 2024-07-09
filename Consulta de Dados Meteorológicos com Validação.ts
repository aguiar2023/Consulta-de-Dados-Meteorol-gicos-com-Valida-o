const regex = /^[a-zA-Z\s-]+$/; // Expressão regular para validar o nome da cidade

async function validateCityName(city) {
  return regex.test(city); // Retorna true se o nome da cidade for válido, false caso contrário
}

async function getWeather(city) {
  const apiKey = 'SUA_CHAVE_DE_API'; // Insira sua chave API aqui
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === '404') {
      throw new Error('Cidade não encontrada');
    }

    const temperature = data.main.temp;
    return temperature;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function main() {
  let city = prompt('Digite o nome da cidade: ');

  while (!await validateCityName(city)) {
    city = prompt('Nome da cidade inválido. Digite novamente: ');
  }

  const temperature = await getWeather(city);

  if (temperature) {
    console.log(`A temperatura atual em ${city} é de ${temperature}°C`);
  } else {
    console.error('Falha ao obter a temperatura');
  }
}

main();
