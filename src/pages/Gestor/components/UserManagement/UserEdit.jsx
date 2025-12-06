import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import styles from "./UserEdit.module.css";

export default function UserEdit() {
    const location = useLocation();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState(null);
    const [showError, setShowError] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const targetEmail = location.state?.emailUsuario;
    
    const sessionData = sessionStorage.getItem("loggedInUser");
    const sessionUser = sessionData ? JSON.parse(sessionData) : null;
    const isSelf = sessionUser?.email === targetEmail;

    const dbUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const targetUser = dbUsers.find((u) => u.email === targetEmail);
    
    const [data, setData] = useState({
        name: targetUser?.name || "",
        email: targetUser?.email || "",
        password: targetUser?.password || ""
    });
    
    const showDuration = 2500;
    const transitionDuration = 500;
    
    useEffect(() => {
        if(errorMsg) {
            setShowError(true);
            const t1 = setTimeout(() => setShowError(false), showDuration);
            const t2 = setTimeout(() => setErrorMsg(null), showDuration + transitionDuration);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [errorMsg]);
    
    useEffect(() => {
        if(successMsg) {
            setShowSuccess(true);
            const t1 = setTimeout(() => setShowSuccess(false), showDuration);
            const t2 = setTimeout(() => setSuccessMsg(null), showDuration + transitionDuration);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [successMsg]);

    if (!targetUser && !loading && !deleting) {
        return (
            <section className={styles.container}>
                <div className={styles.card}>
                    <p style={{ color: 'red', marginBottom: '20px' }}>Usuário não encontrado.</p>
                    <Button onClick={() => navigate("../gerenciar-usuario")}>Voltar</Button>
                </div>
            </section>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSave = () => {
        setLoading(true);
        
        const updatedList = dbUsers.map((u) => {
            if (u.email === targetEmail) return { ...u, ...data };
            return u;
        });
        
        localStorage.setItem("users", JSON.stringify(updatedList));

        if (isSelf) {
            sessionStorage.removeItem("loggedInUser");
            setSuccessMsg("Perfil atualizado! Redirecionando para login...");
            
            setTimeout(() => {
                navigate("/"); 
            }, showDuration + transitionDuration);
        } else {
            setSuccessMsg("Dados atualizados com sucesso!");
            setTimeout(() => {
                navigate("../gerenciar-usuario");
            }, showDuration + transitionDuration);
        }
    };

    const handleDeleteClick = () => {
        if (isSelf) {
            setErrorMsg("Você não pode apagar seu próprio usuário logado.");
            return;
        }
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setDeleting(true);
        const filteredList = dbUsers.filter((u) => u.email !== targetEmail);
        localStorage.setItem("users", JSON.stringify(filteredList));
        
        setShowDeleteConfirm(false);
        setSuccessMsg("Usuário apagado com sucesso!");
        
        setTimeout(() => {
            navigate("../gerenciar-usuario");
        }, showDuration + transitionDuration);
    };

    return (
        <section className={styles.container}>
            <div className={styles.card}>
                {(targetUser || loading || deleting) && (
                    <>
                        <h2 className={styles.titulo}>Editando Usuário</h2>
                        <p className={styles.atualizeUsuario}>
                            {isSelf 
                                ? "Você está editando seu próprio perfil." 
                                : <>Atualize os dados de <strong>{targetUser?.name}</strong></>}
                        </p>

                        <div className={styles.form}>
                            <Input
                                type="text"
                                label="Nome Completo"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                            <Input
                                type="email"
                                label="E-mail"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                            <div className={styles.password}>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        type={showPass ? "text" : "password"}
                                        label="Senha"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div> 
                                    <Button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? "Ocultar" : "Mostrar"}
                                    </Button>
                                </div>
                            </div>

                            {errorMsg && <div className={`${styles.error} ${(!showError) ? styles["error-hidden"] : ""}`}>{errorMsg}</div>}
                            {successMsg && <div className={`${styles.successful} ${(!showSuccess) ? styles["successful-hidden"] : ""}`}>{successMsg}</div>}

                            {showDeleteConfirm ? (
                                <div className={styles.deleteConfirmationBox}>
                                    <p><strong>Tem certeza?</strong> Essa ação não pode ser desfeita.</p>
                                    <div className={styles.confirmActions}>
                                        <Button 
                                            onClick={confirmDelete}
                                            className={styles.buttonConfirmDelete}
                                        >
                                            Apagar
                                        </Button>
                                        <Button 
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className={styles.buttonCancelDelete}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.buttons}>
                                    <Button onClick={handleSave}>Salvar Alterações</Button>
                                    
                                    <Button 
                                        onClick={handleDeleteClick} 
                                        className={styles.deleteButton}
                                        disabled={isSelf}
                                        style={isSelf ? { opacity: 0.5, cursor: 'not-allowed', backgroundColor: '#ccc' } : {}}
                                    >
                                        Apagar Usuário
                                    </Button>
                                    
                                    <div>
                                        <Button onClick={() => navigate("../gerenciar-usuario")}>
                                            Cancelar
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}