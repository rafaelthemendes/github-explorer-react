import React, { useState, FormEvent, useEffect } from 'react';
import { Title, Form, Repositories, InputError } from './styles';
import Logo from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const STORAGE_KEY = '@GitHubExplorer:repositories';

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem(STORAGE_KEY);
    if (storedRepositories) {
      return JSON.parse(storedRepositories);
    }
    return [];
  });
  const [newRepoName, setNewRepoName] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(repositories));
  }, [repositories]);

  const handleAddNewRepository = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newRepoName) {
      return setInputError(
        'Digite autor/nome_do_repositório. Ex: facebook/react'
      );
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepoName}`);
      setRepositories([...repositories, response.data]);
      setNewRepoName('');
      setInputError('');
    } catch {
      setInputError('Repositório não encontrado 😥');
    }
  };

  return (
    <>
      <img src={Logo} alt="GitHub Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddNewRepository}>
        <input
          placeholder="Digite o nome do repositório"
          value={newRepoName}
          onChange={(e) => setNewRepoName(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <InputError>{inputError}</InputError>}

      <Repositories>
        {repositories.map((repository) => (
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description + repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
