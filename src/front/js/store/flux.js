const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			ideas: [],
			favoriteIdeas: [],
			news: [],
			fromCurrency: "",
			toCurrency: "",
			amount: 0,
			conversionRate: 0,
			convertedAmount: 0,

			user: {},
			isLoged: false,
			isPremium: false,
			alert: {
				message: "",
				type: ""
			},
			clientSecret: null,
			tips: []

		},
		actions: {
			showAlert: (message, type = "success") => {
				setStore({ alert: { message, type } });
				setTimeout(() => setStore({ alert: { message: "", type: "" } }), 2000);
			},

			getIdeas: async (budget, country, area) => {
				const uri = `${process.env.BACKEND_URL}/advisor`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						budget,
						country,
						area
					})
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log(response.status);
					return;
				}
				const data = await response.json();
				setStore({ ideas: data.ideas });
			},
			clearIdeas: () => {
				if (getStore().ideas.length > 0) {
					setStore({ ideas: [] });
					console.log("Ideas generadas eliminadas");
				}
			},
			getNews: async (category) => {
				const uri = `${process.env.BACKEND_URL}/news?category=${category}`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log(response.status);
					return;
				}
				const data = await response.json()
				setStore({ news: data.news });
			},

			logIn: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/login`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					getActions().showAlert("Email o contraseña incorrectos", "danger");
					console.log(response.status);
					return false;
				}
				const data = await response.json();
				localStorage.setItem('token', data.access_token);
				localStorage.setItem('user', JSON.stringify(data.results));
				setStore({ isLoged: true, user: data.results.email, isPremium: data.results.is_premium });
				getActions().showAlert("Bienvenido de nuevo!", "success");
				return true;
			},

			logOut: () => {
				setStore({ isLoged: false, user: {} });
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				getActions().showAlert("Hasta pronto!", "success");
			},

			isLogged: () => {
				const token = localStorage.getItem('token');
				if (token) {
					const userData = JSON.parse(localStorage.getItem('user'));
					setStore({ isLoged: true, user: userData, isPremium: userData.is_premium });
					console.log("Usuario autenticado:", userData);
				} else {
					console.log("Usuario no autenticado");
				}
			},

			signUp: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/signup`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log(response.status);
					return false;
				}
				const data = await response.json();

				localStorage.setItem('token', data.access_token);
				localStorage.setItem('user', JSON.stringify(data.results));

				setStore({ isLoged: true, user: data.results.email });
				getActions().showAlert("Registro exitoso. Bienvenido/a!", "success");
				return true;
			},

			deleteUser: async (userId) => {
				if (!userId || userId === 'undefined') {
					console.error("User ID is undefined or invalid");
					return false;
				}
			
				try {
					const token = localStorage.getItem('token');
					if (!token) {
						console.error("Token no encontrado. El usuario no está autenticado.");
						return false;
					}
			
					const response = await fetch(`${process.env.BACKEND_URL}/admin/users/${userId}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					});
			
					if (!response.ok) throw new Error("Error al eliminar el usuario");
					const data = await response.json();
					console.log(data.message);
					return true;
				} catch (error) {
					console.error("Error al eliminar el usuario:", error);
					return false;
				}
			},

			resetPassword: async (token, newPassword) => {
				const uri = `${process.env.BACKEND_URL}/reset-password`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify({ password: newPassword })
				};
				const response = await fetch(uri, options);
				const data = await response.json();

				if (response.ok) {
					getActions().showAlert("Contraseña actualizada con éxito", "success");
				}
				return { success: response.ok, message: data.message };
			},

			requestPasswordReset: async (email) => {
				const uri = `${process.env.BACKEND_URL}/request-password-reset`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email })
				};
				const response = await fetch(uri, options);
				const data = await response.json();

				if (response.ok) {
					getActions().showAlert("Revisa tu correo para el enlace de restablecimiento", "success");
				}
				return { success: response.ok, message: data.message };
			},

			getConvert: async (fromCurrency, toCurrency, amount) => {
				const uri = `${process.env.BACKEND_URL}/converter?from_currency=${fromCurrency}&to_currency=${toCurrency}&amount=${amount}`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log(response.status);
					return;
				}
				const data = await response.json();
				console.log(data.results);
				setStore({
					fromCurrency: data.results.base_code,
					toCurrency: data.results.target_code,
					originalAmount: amount,
					conversionRate: data.results.conversion_rate,
					convertedAmount: data.results.conversion_result
				})
			},

			accessProtected: async () => {
				const uri = `${process.env.BACKEND_URL}/protected`;
				const token = localStorage.getItem('token');
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log(response.status);
					return;
				}
				const data = await response.json()
			},

			addFavoriteIdea: async (newFavorite) => {
				const token = localStorage.getItem('token');
				if (!token) {
					console.error("Token no encontrado. El usuario no está autenticado.");
					getActions().showAlert("Por favor, inicia sesión para agregar ideas a favoritos.", "warning");
					return;
				}

				const uri = `${process.env.BACKEND_URL}/favorite-ideas`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(newFavorite)
				};

				try {
					const response = await fetch(uri, options);
					if (!response.ok) {
						const errorData = await response.json();
						console.error("Error al guardar la idea favorita:", errorData.message || response.status);
						getActions().showAlert("Error al guardar la idea favorita: " + (errorData.message || "Inténtalo nuevamente"), "danger");
						return;
					}

					const data = await response.json();
					console.log("Respuesta del backend:", data);

					if (data.favoriteIdea) {
						setStore({ favoriteIdeas: [...getStore().favoriteIdeas, data.favoriteIdea] });
						getActions().showAlert("Nueva Idea guardada!", "success");
					} else {
						console.error("La respuesta no contiene 'favoriteIdea'.", data);
						getActions().showAlert("Suscribete para guardar la idea", "warning");
					}
				} catch (error) {
					console.error("Error de red o de servidor:", error);
					getActions().showAlert("Error de red. Inténtalo nuevamente.", "danger");
				}
			},

			removeFavoriteIdea: async (ideaId) => {
				const uri = `${process.env.BACKEND_URL}/favorite-ideas/${ideaId}`;
				const token = localStorage.getItem('token');
				const options = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					console.error("Error al eliminar la idea favorita:", response.status);
					return;
				}

				setStore({ favoriteIdeas: getStore().favoriteIdeas.filter(idea => idea.id !== ideaId) });
				getActions().showAlert("Idea favorita eliminada!", "success");
			},

			getFavoriteIdeas: async () => {
				const uri = `${process.env.BACKEND_URL}/favorite-ideas`;
				const token = localStorage.getItem('token');
				if (!token) {
					console.error("Token no encontrado.");
					return;
				}
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};

				try {
					const response = await fetch(uri, options);
					console.log("Status:", response.status);

					if (!response.ok) {
						console.error("Error al obtener ideas favoritas:", response.status);
						return;
					}

					const data = await response.json();
					console.log("Datos de ideas favoritas:", data.results);

					if (Array.isArray(data.results)) {
						setStore({ favoriteIdeas: data.results });
						console.log("favoriteIdeas actualizado en el estado:", getStore().favoriteIdeas);
					} else {
						console.error("La respuesta no contiene un array de resultados.");
						setStore({ favoriteIdeas: [] });
					}
				} catch (error) {
					console.error("Error al obtener las ideas favoritas:", error);
				}
			},

			getIdeaTips: async (ideaId) => {
				if (!getStore().isPremium) {
					getActions().showAlert("Necesitas ser un usuario premium para acceder a esta función.", "warning");
					return null;
				}

				const uri = `${process.env.BACKEND_URL}/favorite-ideas/${ideaId}/tips`;
				const token = localStorage.getItem('token');

				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};

				try {
					const response = await fetch(uri, options);
					if (!response.ok) {
						console.error("Error al obtener los consejos:", response.status);
						getActions().showAlert("No se pudieron cargar los consejos", "danger");
						setStore({ tips: [] });
						return null;
					}

					const data = await response.json();
					setStore({ tips: data.tips });
					return data.tips;
				} catch (error) {
					console.error("Error al procesar la respuesta:", error);
					getActions().showAlert("Error al procesar la respuesta", "danger");
					setStore({ tips: [] });
					return null;
				}
			},
			startCheckoutSession: async () => {
				const uri = `${process.env.BACKEND_URL}/create-checkout-session`;
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error al crear la sesión de Stripe:", response.status);
					return;
				};
				const data = await response.json();
				window.location.href = data.url;
			},

			checkPremiumStatus: async () => {
				const token = localStorage.getItem('token');
				if (!token) {
					console.error("Token no encontrado. El usuario no está autenticado.");
					return;
				}

				const uri = `${process.env.BACKEND_URL}/user-status`;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};

				try {
					const response = await fetch(uri, options);
					if (!response.ok) {
						console.error("Error al verificar el estado de premium:", response.status);
						return;
					}

					const data = await response.json();
					console.log("Estado de usuario actualizado:", data);
					setStore({ isPremium: data.is_premium });
				} catch (error) {
					console.error("Error de red o de servidor al verificar el estado de premium:", error);
				}
			}
		}
	};
};

export default getState;
