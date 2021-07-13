import React from 'react'

export default function Footer(){
    const date = new Date().getFullYear();

    return <footer>
<div className="foot">
    <p>For News and Articles</p>
    <form>
        <input type="text" placeholder="Enter Email"/>
        <button className="footb">Subscribe</button>
        </form>
</div>
       
        <div className="footinfo">
            <p>About Us</p>
            <p>Contact Us</p>
            <p>
    API Docs
            </p>
            <p>Github Repo</p>
        </div>
        <div>
            <p>Copyright Safe Courier {date}</p>
        </div>
    </footer>
}