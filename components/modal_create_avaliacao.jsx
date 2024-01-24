import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, Select, MenuItem } from '@mui/material';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import headers from 'pages/api/headers';
import * as token from "../helpers/authorization"


const UserInfoModal = ({ isOpen, onClose, onSubmit, token_access, token_refresh }) => {

  const [idservice, setidservice] = useState('');
  const [idorgao, setidorgao] = useState('');
  const [cpf, setcpf] = useState('');
  const [protocolo, setprotocolo] = useState('');
  const [idcanalprestacao, setidcanalprestacao] = useState('');
  const [idcanalavaliacao, setidcanalavaliacao] = useState('');
  const [ididpesquisa, setididpesquisa] = useState('');
  const [nome, setnome] = useState('');
  const [telefone, settelefone] = useState('');
  const [email, setemail] = useState('');

  const [dataservicos, setgetdataservicos] = useState([]);
  const [dataorgaos, setgetdataorgaos] = useState([]);
  const [datacanalavaliacao, setgetdatacanalavaliacao] = useState([]);
  const [datacanalprestacao, setgetdatacanalprestacao] = useState([]);
  const [datacanalpesquisas, setgetdatapesquisas] = useState([]);

  useEffect(() => {
    fetchServicos();
    fetchOrgaos();
    fetchCanalAvaliacao();
    fetchCanalPrestacao();
    fetchCanalPesquisas();
  }, []);

  const fetchServicos = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/servicos?access=${token_access}&refresh=${token_refresh}`, {
      method: 'GET',
    })
    let data = await response.json()
    setgetdataservicos(data.data);
  };

  const fetchOrgaos = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/orgaos?access=${token_access}&refresh=${token_refresh}`, {
      method: 'GET',
    })
    let data = await response.json()
    setgetdataorgaos(data.data);
  };


  const fetchCanalAvaliacao = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/canal_avaliacao?access=${token_access}&refresh=${token_refresh}`, {
      method: 'GET',
    })
    let data = await response.json()
    setgetdatacanalavaliacao(data.data);
  };

  const fetchCanalPrestacao = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/canal_prestacao?access=${token_access}&refresh=${token_refresh}`, {
      method: 'GET',
    })
    let data = await response.json()
    setgetdatacanalprestacao(data.data);
  };

  const fetchCanalPesquisas = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/pesquisas?access=${token_access}&refresh=${token_refresh}`, {
      method: 'GET',
    })
    let data = await response.json()
    setgetdatapesquisas(data.data);
  };


  const handleSubmit = () => {
    onSubmit({ idservice, idorgao, cpf, protocolo, idcanalprestacao, idcanalavaliacao, ididpesquisa, nome, telefone, email });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto', // Adicionando rolagem na vertical
      }}
    >
      <Box sx={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <h2>Gere uma nova avaliação</h2>

        <FormControl fullWidth >
          <InputLabel>Selecione o Serviço</InputLabel>
          <Select
            label="Serviço"
            margin="normal"
            value={idservice}
            onChange={(e) => setidservice(e.target.value)}
          >
            {dataservicos.map((_servico) => (
              <MenuItem key={_servico.id} value={_servico.id}>
                {_servico.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Selecione o orgão</InputLabel>
          <Select
            label="Orgão"
            margin="normal"
            value={idorgao}
            onChange={(e) => setidorgao(e.target.value)}
          >
            {dataorgaos.map((_orgao) => (
              <MenuItem key={_orgao.id} value={_orgao.id}>
                {_orgao.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Digite o Cpf"
          margin="normal"
          value={cpf}
          onChange={(e) => setcpf(e.target.value)}
          fullWidth
        />

        <TextField
          label="Nome"
          margin="normal"
          value={nome}
          onChange={(e) => setnome(e.target.value)}
          fullWidth
        />

        <TextField
          label="Telefone"
          margin="normal"
          value={telefone}
          onChange={(e) => settelefone(e.target.value)}
          fullWidth
        />

        <TextField
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          fullWidth
        />

        <TextField
          label="Digite o protocolo"
          margin="normal"
          value={protocolo}
          onChange={(e) => setprotocolo(e.target.value)}
          fullWidth
        />

        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Selecione um canal de avaliação</InputLabel>
          <Select
            label="CanalAv"
            margin="normal"
            value={idcanalavaliacao}
            onChange={(e) => setidcanalavaliacao(e.target.value)}
          >
            {datacanalavaliacao.map((_canal_avaliacao) => (
              <MenuItem key={_canal_avaliacao.id} value={_canal_avaliacao.id}>
                {_canal_avaliacao.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Selecione um canal de prestação</InputLabel>
          <Select
            label="CanalPt"
            margin="normal"
            value={idcanalprestacao}
            onChange={(e) => setidcanalprestacao(e.target.value)}
          >
            {datacanalprestacao.map((_canal_prestacao) => (
              <MenuItem key={_canal_prestacao.id} value={_canal_prestacao.id}>
                {_canal_prestacao.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Selecione uma pesquisa</InputLabel>
          <Select
            label="Pesquisa"
            margin="normal"
            value={ididpesquisa}
            onChange={(e) => setididpesquisa(e.target.value)}
          >
            {datacanalpesquisas.map((_pesquisa) => (
              <MenuItem key={_pesquisa.survey_id} value={_pesquisa.survey_id}>
                {_pesquisa.titulo} - {_pesquisa.descricao}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>Enviar</Button>
      </Box>
    </Modal>
  );
};

export default UserInfoModal;
