import React from "react";
import "./Analysis.css";

const Analysis = () => {
  return (<main>


    <div className="Analysis">
            <h2 style={{color:"orange"}}>Analysis</h2>
            <div class="insights">
                <div class="sales">
                    <span class="material-icons-sharp">analytics</span>
                    <div class="middle">
                        <div class="left">
                            <h3>Total Users</h3>
                            <h1>6</h1>
                        </div>
                        <div class="progress">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div class="number">
                                <p>100%</p>
                            </div>
                        </div>
                    </div>
                    <small class="text-muted">Last 24 hours</small>
                </div>

                <div class="expenses">
                    <span class="material-icons-sharp">bar_chart</span>
                    <div class="middle">
                        <div class="left">
                            <h3>Number of Posts</h3>
                            <h1>10</h1>
                        </div>
                        <div class="progress">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div class="number">
                                <p>80%</p>
                            </div>
                        </div>
                    </div>
                    <small class="text-muted">Last 24 hours</small>
                </div>

                <div class="income">
                    <span class="material-icons-sharp">stacked_line_chart</span>
                    <div class="middle">
                        <div class="left">
                            <h3>Inappropriate Posts</h3>
                            <h1>3</h1>
                        </div>
                        <div class="progress">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div class="number">
                                <p>10%</p>
                            </div>
                        </div>
                    </div>
                    <small class="text-muted">Last 24 hours</small>
                </div>
            </div>
     </div>
     </main>
    );
};

export default Analysis;