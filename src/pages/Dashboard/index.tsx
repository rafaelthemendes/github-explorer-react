import React from 'react';
import { Title, Form, Repositories } from './styles';
import Logo from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';

const Dashboard: React.FC = () => (
  <>
    <img src={Logo} alt="GitHub Explorer" />
    <Title>Explore repositórios no GitHub</Title>

    <Form>
      <input placeholder="Digite o nome do repositório" />
      <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
      <a href="http://">
        <img
          src="https://avatars2.githubusercontent.com/u/15945802?s=460&u=8cd3efd06fa80ec142f87a0c8f76cd7b14c254a0&v=4 "
          alt="Mendown"
        />
        <div>
          <strong>altos_repos/marmassa</strong>
          <p>Um repozinho bem sincero</p>
        </div>
        <FiChevronRight size={20} />
      </a>

      <a href="http://">
        <img
          src="https://avatars2.githubusercontent.com/u/15945802?s=460&u=8cd3efd06fa80ec142f87a0c8f76cd7b14c254a0&v=4 "
          alt="Mendown"
        />
        <div>
          <strong>altos_repos/marmassa</strong>
          <p>Um repozinho bem sincero</p>
        </div>
        <FiChevronRight size={20} />
      </a>

      <a href="http://">
        <img
          src="https://avatars2.githubusercontent.com/u/15945802?s=460&u=8cd3efd06fa80ec142f87a0c8f76cd7b14c254a0&v=4 "
          alt="Mendown"
        />
        <div>
          <strong>altos_repos/marmassa</strong>
          <p>Um repozinho bem sincero</p>
        </div>
        <FiChevronRight size={20} />
      </a>
    </Repositories>
  </>
);

export default Dashboard;
