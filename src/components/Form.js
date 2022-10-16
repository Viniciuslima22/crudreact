import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";



const FormContainer = styled.form`
display: flex;
align-items: flex-end;
gap: 10px;
flex-wrap: wrap;
background-color: #ffff;
padding: 20px;
box-shadow: 0px 0px 5px green;
border-radius: 7px;
margin-top: 300px;
animation:slide-bck-top 1.3s cubic-bezier(.47,0.000,.745,.715) both;
@keyframes slide-bck-top{0%{transform:translateZ(0) translateY(0)}100%{transform:translateZ(-400px) translateY(-300px)}}
`
const InputArea = styled.div`
display: flex;
flex-direction: column;
`
const Input = styled.input`
width: 120px;
padding: 0 10px;
border: 1px solid green;
border-radius: 5px;
height: 40px;
`
const Label = styled.label``

const Button = styled.button`
padding: 10px;
border: none;
border-radius: 5px;
background-color: green;
color: #ffff;
height: 42px;
cursor: pointer;
font-weight: bold;
`

const Form = ({  getUsers, onEdit, setOnEdit }) => {
    const ref = useRef()

    useEffect(() => {
        if (onEdit) {
            const user = ref.current

            user.nome.value = onEdit.nome
            user.emai.value = onEdit.email
            user.fone.value = onEdit.fone
            user.data_nascimento.value = onEdit.data_nascimento
        }
    }, [onEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.nome.value ||
            !user.email.value ||
            !user.fone.value ||
            !user.data_nascimento.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800", {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";

        setOnEdit(null);
        getUsers();
    };
    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone" />
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type="date" />
            </InputArea>

            <Button>SALVAR</Button>
        </FormContainer>
    )
}

export default Form