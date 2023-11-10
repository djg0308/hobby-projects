import React from 'react'
import './footer.css'
import logo from '../../images/logos.png'

export default function footer() {
  return (
    <body>
        <footer>
            <article>
                <h3>Footery thingamabob</h3>
                <button>
                    <p>Button</p>
                    <span> → </span>
                </button>
            </article>
            <section class="top">
                <img src={logo} alt="#" />
                <ul>
                    <li>
                        <h3>Resources</h3>
                        <a>Usage</a>
                        <a>Docs</a>
                        <a>Support</a>
                        <a>Hardware</a>
                    </li>
                    <li>
                        <h3>Overview</h3>
                        <a>something</a>
                        <a>nothing</a>
                        <a>anything</a>
                        <a>cat</a>
                    </li>
                    <li>
                        <h3>Title</h3>
                        <a>first thing</a>
                        <a>second thing</a>
                        <a>third thing</a>
                        <a>yes</a>
                    </li>
                    <li>
                        <h3>Number 4</h3>
                        <a>One fish</a>
                        <a>Two fish</a>
                        <a>Red fish</a>
                        <a>Blue fish</a>
                    </li>
                </ul>
            </section>
            <section class="bottom"> © 2023 Hologram</section>
        </footer>
    </body>
  )
}
