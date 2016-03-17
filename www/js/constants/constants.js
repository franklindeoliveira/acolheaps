angular
    .module('starter')
    .constant(
    	'PacientesMock', [
	    	{
	        "id": 0,
	        "id_cuidado": "0",
	        "nome": "Paciente 0",
	        "numero_prontuario": "0",
	        "idade": 0,
	        "nasc": '00/00/0000',
	        "pront": '000',
	        "escola": 'Escola 0',
	        "trabalho": 'Trabalho 0',
	        "respref": 'Resp. de ref. 0',
	        "nvulnerab": 'Nível de vulnerabilidade 0'
	      },
	      {
	        "id": 1,
	        "id_cuidado": "1",
	        "nome": "Paciente 1",
	        "numero_prontuario": "1",
	        "idade": 1,
	        "nasc": '11/11/1111',
	        "pront": '111',
	        "escola": 'Escola 1',
	        "trabalho": 'Trabalho 1',
	        "respref": 'Resp. de ref. 1',
	        "nvulnerab": 'Nível de vulnerabilidade 1'
	      },
	      {
	        "id": 2,
	        "id_cuidado": "2",
	        "nome": "Paciente 2",
	        "numero_prontuario": "2",
	        "idade": 2,
	        "nasc": '22/22/2222',
	        "pront": '222',
	        "escola": 'Escola 2',
	        "trabalho": 'Trabalho 2',
	        "respref": 'Resp. de ref. 2',
	        "nvulnerab": 'Nível de vulnerabilidade 2'
	      }
    	])
	.constant(
    	'RegistrosMock', [
    		{
		      "data": "10/10/2000",
		      "nome": "Paciente 1",
		      "idade": 1,
		      "numero_prontuario": "1"
		    },
		    {
		      "data": "11/10/2001",
		      "nome": "Paciente 1",
		      "idade": 2,
		      "numero_prontuario": "1"
		    },
		    {
		      "data": "12/10/2002",
		      "nome": "Paciente 1",
		      "idade": 3,
		      "numero_prontuario": "1"
		    },
		    {
		      "data": "10/10/2003",
		      "nome": "Paciente 1",
		      "idade": 4,
		      "numero_prontuario": "1"
		    },
		    {
		      "data": "11/10/2004",
		      "nome": "Paciente 1",
		      "idade": 5,
		      "numero_prontuario": "1"
		    },
		    {
		      "data": "12/10/2005",
		      "nome": "Paciente 1",
		      "idade": 6,
		      "numero_prontuario": "1"
		    },
		    {
		      "data": "10/10/2006",
		      "nome": "Paciente 1",
		      "idade": 7,
		      "numero_prontuario": "1"
		    },
		    {
		      "data": "11/10/2007",
		      "nome": "Paciente 1",
		      "idade": 8,
		      "numero_prontuario": "1"
		    },
		    {
		      "data": "12/10/2008",
		      "nome": "Paciente 1",
		      "idade": 9,
		      "numero_prontuario": "1"
		    },
		    {
		      "data": "12/10/2009",
		      "nome": "Paciente 1",
		      "idade": 10,
		      "numero_prontuario": "1"
		    }

    	])
	.constant(
    	'CuidadosMock', [
    		{
    		  "id": "0",
		      "data": "xx/xx/xxxx",
		      "descricao": "Descrição 0",
		      "articulacao": "Articulacao 0",
		      "status": "a fazer"
		    },
		    {
		      "id": "1",
		      "data": "xx/xx/xxxx",
		      "descricao": "Descrição 1",
		      "articulacao": "Articulacao 1",
		      "status": "concluido"
		    },
		    {
		      "id": "2",
		      "data": "xx/xx/xxxx",
		      "descricao": "Descrição 2",
		      "articulacao": "Articulacao 2",
		      "status": "a fazer"
		    }
    	]);