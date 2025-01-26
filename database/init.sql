-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS task_manager;

-- Usar o banco de dados criado
USE task_manager;

-- Criar a tabela de usuários
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar a tabela de tarefas
CREATE TABLE IF NOT EXISTS Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pendente', 'em_andamento', 'concluida') DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Inserir dados iniciais de usuários
INSERT INTO Users (name, email, password) VALUES
('Nextek', 'teste@nextek.com.br', 'nextek123');

-- Inserir dados iniciais de tarefas
INSERT INTO Tasks (user_id, title, description, status) VALUES
(1, 'Configurar Redis', 'Configurar o cache Redis para o projeto', 'pendente'),
(1, 'Criar API de autenticação', 'Implementar autenticação com JWT', 'em_andamento'),
(1, 'Finalizar design do frontend', 'Ajustar componentes para layout responsivo e acessível', 'concluida');
