import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../contexts/Provider';
import mockPlanets from './helpers/mockPlanets';

describe('Testa a aplicação StarWars', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockPlanets)
    });
    render(
      <Provider>
        <App />
      </Provider>
    )
  });

  test('Verifica se os elementos do formulário são renderizados corretamente na tela', () => {
    const nameFilterInput = screen.getByTestId('name-filter');
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const sortColumn = screen.getByTestId('column-sort');
    const asc = screen.getByTestId('column-sort-input-asc');
    const desc = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');
    const removeFilterBtn = screen.getByTestId('button-remove-filters');

    expect(nameFilterInput).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
    expect(sortColumn).toBeInTheDocument();
    expect(asc).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(sortBtn).toBeInTheDocument();
    expect(removeFilterBtn).toBeInTheDocument();
  });

  test('Verifica se os elementos da tabela são renderizados corretamente na tela', async () => {
    const name = await screen.findByRole('columnheader', { name: /name/i });
    const rotation = await screen.findByRole('columnheader', { name: /rotation_period/i });
    const orbital = await screen.findByRole('columnheader', { name: /orbital_period/i });
    const diameter = await screen.findByRole('columnheader', { name: /diameter/i });
    const climate = await screen.findByRole('columnheader', { name: /climate/i });
    const gravity = await screen.findByRole('columnheader', { name: /gravity/i });
    const terrain = await screen.findByRole('columnheader', { name: /terrain/i });
    const surface = await screen.findByRole('columnheader', { name: /surface_water/i });
    const population = await screen.findByRole('columnheader', { name: /population/i });

    expect(name).toBeInTheDocument();
    expect(rotation).toBeInTheDocument();
    expect(orbital).toBeInTheDocument();
    expect(diameter).toBeInTheDocument();
    expect(climate).toBeInTheDocument();
    expect(gravity).toBeInTheDocument();
    expect(terrain).toBeInTheDocument();
    expect(surface).toBeInTheDocument();
    expect(population).toBeInTheDocument();
  });

  test('Verifica se ao modificar os valores dos inputs, a aplicação funciona corretamente', () => {
    const nameFilterInput = screen.getByTestId('name-filter');
    userEvent.type(nameFilterInput, 'alde');
    expect(nameFilterInput).toHaveValue('alde');

    const column = screen.getByTestId('column-filter');
    userEvent.selectOptions((column), 'diameter');
    expect(column).toHaveValue('diameter');

    const comparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparison, 'igual a');
    expect(comparison).toHaveValue('igual a');

    const value = screen.getByTestId('value-filter');
    userEvent.type(value, '400');
    expect(value).toHaveValue(400);

    const sortColumn = screen.getByTestId('column-sort');
    userEvent.selectOptions(sortColumn, 'surface_water');
    expect(sortColumn).toHaveValue('surface_water');

    const asc = screen.getByTestId('column-sort-input-asc');
    const desc = screen.getByTestId('column-sort-input-desc');
    userEvent.click(desc);
    expect(asc).not.toBeChecked();
    expect(desc).toBeChecked();
    userEvent.click(asc);
    expect(asc).toBeChecked();
    expect(desc).not.toBeChecked();
  });

  test('Verifica o funcionamento da aplicação ao filtrar os planetas pelo nome', async () => {
    const planet = await screen.findByRole('cell', { name: /tatooine/i });
    expect(planet).toBeInTheDocument();

    const nameFilterInput = screen.getByTestId('name-filter');
    userEvent.type(nameFilterInput, 'alde');
    expect(planet).not.toBeInTheDocument();
  })

  test('Verifica o funcionamento da aplicação ao utilizar os outros filtros', async () => {
    const planetTatooine = await screen.findByRole('cell', { name: /tatooine/i });
    const planetAlderaan = await screen.findByRole('cell', { name: /alderaan/i });
    const planetYavin = await screen.findByRole('cell', { name: /yavin/i });
    const planetHoth = await screen.findByRole('cell', { name: /hoth/i });
    const planetDagobah = await screen.findByRole('cell', { name: /dagobah/i });
    const planetBespin = await screen.findByRole('cell', { name: /bespin/i });

    expect(planetTatooine).toBeInTheDocument();
    expect(planetAlderaan).toBeInTheDocument();
    expect(planetYavin).toBeInTheDocument();
    expect(planetHoth).toBeInTheDocument();
    expect(planetDagobah).toBeInTheDocument();
    expect(planetBespin).toBeInTheDocument();

    const column = screen.getByTestId('column-filter');
    const diameterOption = column.querySelector('option[value="diameter"]');
    const surfaceOption = column.querySelector('option[value="surface_water"]');
    const populationOption = column.querySelector('option[value="population"]');
    expect(diameterOption).toBeInTheDocument();
    expect(surfaceOption).toBeInTheDocument();
    expect(populationOption).toBeInTheDocument();
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const removeFilterBtn = screen.getByTestId('button-remove-filters');

    userEvent.selectOptions((column), 'diameter');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '10000');
    userEvent.click(filterBtn);

    expect(planetTatooine).toBeInTheDocument();
    expect(planetAlderaan).toBeInTheDocument();
    expect(planetHoth).not.toBeInTheDocument();
    expect(planetDagobah).not.toBeInTheDocument();

    expect(diameterOption).not.toBeInTheDocument();

    userEvent.selectOptions((column), 'surface_water');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.clear(value);
    userEvent.type(value, '30');
    userEvent.click(filterBtn);

    expect(surfaceOption).not.toBeInTheDocument();

    expect(planetTatooine).toBeInTheDocument();
    expect(planetAlderaan).not.toBeInTheDocument();
    expect(planetYavin).toBeInTheDocument();
    expect(planetBespin).toBeInTheDocument();

    userEvent.selectOptions((column), 'population');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.clear(value);
    userEvent.type(value, '1000');
    userEvent.click(filterBtn);

    expect(populationOption).not.toBeInTheDocument();

    expect(planetTatooine).not.toBeInTheDocument();
    expect(planetYavin).toBeInTheDocument();
    expect(planetBespin).not.toBeInTheDocument();

    userEvent.click(removeFilterBtn);

    const tatooine = await screen.findByRole('cell', { name: /tatooine/i });
    const alderaan = await screen.findByRole('cell', { name: /alderaan/i });
    const yavin = await screen.findByRole('cell', { name: /yavin/i });
    const bespin = await screen.findByRole('cell', { name: /bespin/i });

    expect(tatooine).toBeInTheDocument();
    expect(alderaan).toBeInTheDocument();
    expect(yavin).toBeInTheDocument();
    expect(bespin).toBeInTheDocument();
  });

  test('Verifica a funcionalidade de colocar em ordem "ascendente" e "descendente"', async () => {
    let planetNames = (await screen.findAllByTestId('planet-name')).map((planet) => planet.textContent);
    let tatooineIndex = planetNames.indexOf('Tatooine');
    expect(tatooineIndex).toBe(0);

    const sortColumn = screen.getByTestId('column-sort');
    const asc = screen.getByTestId('column-sort-input-asc');
    const desc = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');
    
    userEvent.selectOptions(sortColumn, 'diameter');
    userEvent.click(asc);
    userEvent.click(sortBtn);
    planetNames = (await screen.findAllByTestId('planet-name')).map((planet) => planet.textContent);
    tatooineIndex = planetNames.indexOf('Tatooine');
    expect(tatooineIndex).toBe(4);

    userEvent.selectOptions(sortColumn, 'population');
    userEvent.click(desc);
    userEvent.click(sortBtn);
    planetNames = (await screen.findAllByTestId('planet-name')).map((planet) => planet.textContent);
    tatooineIndex = planetNames.indexOf('Tatooine');
    expect(tatooineIndex).toBe(6);
  });
});

