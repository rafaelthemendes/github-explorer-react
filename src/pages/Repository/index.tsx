import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { Header, Issues, RepositoryInfo } from './styles';
import api from '../../services/api';

interface RepositoryParams {
  repositoryName: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  user: {
    login: string;
  };
  html_url: string;
}

const RepositoryDetails: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | undefined>();
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [repositoryResponse, issuesResponse] = await Promise.all([
        api.get(`repos/${params.repositoryName}`),
        api.get(`repos/${params.repositoryName}/issues`),
      ]);
      console.log(issuesResponse.data);
      setRepository(repositoryResponse.data);
      setIssues(issuesResponse.data);
    };
    loadData();
  }, [params.repositoryName]);

  return (
    <>
      <Header>
        <img src={Logo} alt="GitHub Explorer" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url} target="_blank">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default RepositoryDetails;
