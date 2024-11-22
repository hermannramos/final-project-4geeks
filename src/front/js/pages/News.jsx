import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import '../../styles/news.css';

const News = () => {
    const { store, actions } = useContext(Context);

    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!category) {
            alert("Please select a category.");
            return;
        }
        setLoading(true);
        await actions.getNews(category);
        setLoading(false); 
    };

    return (
        <div className="container d-flex flex-column min-vh-100 news-container">
            <h1>Featured News</h1>
            <p className="text-center">Select a news category</p>
            <div className="row mb-3 justify-content-center">
                <div className="col-md-8">
                    <div className="input-group search-bar-container">
                        <select
                            className="form-control custom-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a category</option>
                            <option value="technology">Technology</option>
                            <option value="sports">Sports</option>
                            <option value="business">Business</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="health">Health</option>
                            <option value="science">Science</option>
                        </select>
                        <button className="btn btn-search" onClick={handleSearch}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="loading-bar">
                    <div className="progress-bar"></div>
                </div>
            ) : (
                <div className="row">
                    {store.news.length === 0 ? (
                        <p>No news found.</p>
                    ) : (
                        store.news.map((item, index) => (
                            <div key={index} className="col-md-3">
                                <div className="card">
                                    {item.image && (
                                        <img src={item.image} className="card-img-top" alt={item.title} style={{ aspectRatio: '3 / 2', overflow: 'hidden' }} />
                                    )}
                                    <div className="card-body">
                                        <h5>{item.title}</h5>
                                        <p>{new Date(item.date).toLocaleDateString()}</p>
                                        <p>{item.description}</p>
                                        <button className="button-modern" onClick={() => window.open(item.url, "_blank")}>Read more »</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div >
    );
};

export default News;
