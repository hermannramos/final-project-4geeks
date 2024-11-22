import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import '../../styles/Dashboard.css';

const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        actions.checkPremiumStatus();
        actions.isLogged();
        if (!store.isLoged) {
            navigate("/login");
        } else {
            actions.getFavoriteIdeas();
        }
    }, [store.isLoged]);

    const handleStartIdea = async (idea) => {
        const tips = await actions.getIdeaTips(idea.id);
        if (tips) {
            setShowModal(true);
        }
    };

    const handleDeleteUser = async () => {
        if (store.user && store.user.id) {
            const success = await actions.deleteUser(store.user.id);
            if (success) {
                actions.showAlert("Usuario eliminado correctamente :(. Hasta pronto.", "success");
                navigate("/signup");
            } else {
                actions.showAlert("Hubo un error al eliminar tu cuenta.", "danger");
            }
        } else {
            actions.showAlert("No se pudo obtener el ID de usuario.", "danger");
        }
    };

    const handleShowConfirmModal = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        handleDeleteUser();
        setShowConfirmModal(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
    };
    return (
        <div className="container">
            <div className="container dashboard-container">
                <h2 className="dashboard-title">Mis Ideas Favoritas</h2>
                <p className="dashboard-subtitle">Explora y administra las ideas de negocio que has guardado</p>
                {!store.isPremium && (
                    <button className="btn btn-primary" onClick={() => actions.startCheckoutSession()}>
                        Become a Premium user
                    </button>
                )}
                <div className="row mt-4">
                    {store.favoriteIdeas && store.favoriteIdeas.length > 0 ? (
                        store.favoriteIdeas.map((idea, index) => (
                            idea && idea.title ? (
                                <div className="col-md-6 mb-4" key={index}>
                                    <div className="card shadow-sm h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{idea.title}</h5>
                                            <p className="card-text">{idea.description}</p>
                                            <div className="detail-tags">
                                                <span className="detail-tag"><i className="fas fa-euro-sign"></i> {idea.budget}€</span>
                                                <span className="detail-tag"><i className="fas fa-map-marker-alt"></i> {idea.country}</span>
                                                <span className="detail-tag"><i className="fas fa-briefcase"></i> {idea.area}</span>
                                            </div>
                                            <div className="card-actions mt-3">
                                                <button className="btn btn-success btn-sm" onClick={() => handleStartIdea(idea)}>Empezar</button>
                                                <button className="btn btn-danger btn-sm m-2" onClick={() => actions.removeFavoriteIdea(idea.id)}>Remove Idea</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))
                    ) : (
                        <p>No tienes ideas favoritas guardadas.</p>
                    )}
                </div>
                <div className="delete-account-container">
                    <button className="delete-user" onClick={handleShowConfirmModal}>
                        Delete my account
                    </button>
                </div>
                <Modal show={showConfirmModal} onHide={handleCancelDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar eliminación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Seguro que quiere eliminar este usuario?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancelDelete}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Consejos para empezar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {store.tips.length > 0 ? (
                            <ul>
                                {store.tips.map((tip, index) => (
                                    <li key={index}>
                                        <strong>{tip.intro}:</strong> {tip.content}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Cargando consejos...</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Dashboard;