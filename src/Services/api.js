import axios from "axios";

// Cria uma instância do axios configurada com baseURL para facilitar as requisições
export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Função assíncrona para criar uma sessão de usuário
export const createSession = async (email, password, loggedUserId, token) => {
  return api.post("/auth/signin", { email, password, loggedUserId, token });
};

// Função assíncrona para criar um novo usuário
export const create = async (email, password) => {
  return api.post("/auth/signup", { email, password });
};

// Função assíncrona para obter a lista de habilidades
export const listaSkill = async () => {
  return api.get("/skill/listar");
};

// Função assíncrona para deletar uma habilidade pelo ID
export const deleteId = async (id) => {
  return api.delete(`/skill/${id}`);
};

// Função assíncrona para deletar uma habilidade de um usuário específico pelo ID do usuário e ID da habilidade
export const deleteUsuarioId = async (usuarioId, skillId) => {
  return api.delete(`/skill/${usuarioId}/${skillId}`);
};

// Função assíncrona para atualizar o nível de uma habilidade pelo ID da habilidade e ID do usuário
export const skillPut = async (id, usuarioId, levelSkill) => {
  return api.put(`/skill/levelSkill`, { levelSkill, usuarioId, skillId: id });
};

// Função assíncrona para obter informações de uma habilidade pelo seu ID
export const getIdSkill = async (id) => {
  return api.get(`/skill/${id}`);
};

// Função assíncrona para atualizar informações de uma habilidade pelo seu ID, nível de habilidade e ID do usuário
export const atualizarId = async (id, levelSkill, usuarioId) => {
  return api.put(`/skill/atualizar`, { skillId: id, levelSkill, usuarioId });
};
