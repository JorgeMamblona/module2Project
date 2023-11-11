<h1> POKEMON </h1>

<table>
    <thead>
        <th>HTTP Method</th>
        <th>URI path</th>
        <th>Desription</th>
        <th>Auth type</th>
        <th>JSON</th>
    </thead>
    <tbody>
        <tr>
            <td>GET</td>
            <td><code>/</code></td>
            <td>Index page</td>
            <td>public</td>
            <td></td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/pokemons/gallery</code></td>
            <td>Pokemon gallery with filters</td>
            <td>public</td>
            <td></td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/pokemons/{id}</code></td>
            <td>Pokemon details</td>
            <td>public</td>
            <td></td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/trainers/gallery</code></td>
            <td>Teams gallery</td>
            <td>trainer</td>
            <td></td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/trainers/myteam</code></td>
            <td>My team details</td>
            <td>owner</td>
            <td></td>
        </tr>
        <tr>
            <td>POST</td>
            <td><code>/trainers/myteam/delete/{id}</code></td>
            <td>Delete a pokemon from my team</td>
            <td>owner</td>
            <td></td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/register</code></td>
            <td>Registration form</td>
            <td>public</td>
            <td></td>
        </tr>
        <tr>
            <td>POST</td>
            <td><code>/register</code></td>
            <td>Registration in DB</td>
            <td>public</td>
            <td></td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/login</code></td>
            <td>Login form</td>
            <td>public</td>
            <td></td>
        </tr>
        <tr>
            <td>POST</td>
            <td><code>/login</code></td>
            <td>Login in DB</td>
            <td>public</td>
            <td></td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/gym/gym-map</code></td>
            <td>Google map with all the gyms</td>
            <td>trainer</td>
            <td></td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/gym/create</code></td>
            <td>Create a gym</td>
            <td>leader</td>
            <td></td>
        </tr>
        <tr>
            <td>POST</td>
            <td><code>/gym/create</code></td>
            <td>Create a gym in DB</td>
            <td>leader</td>
            <td></td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/gym/edit/{id}</code></td>
            <td>Edit a gym</td>
            <td>leader</td>
            <td></td>
        </tr>
        <tr>
            <td>POST</td>
            <td><code>/gym/edit/{id}</code></td>
            <td>Edit a gym in DB</td>
            <td>leader</td>
            <td></td>
        </tr>
        <tr>
            <td>POST</td>
            <td><code>/gym/delete/{id}</code></td>
            <td>Delete a gym</td>
            <td>leader</td>
            <td></td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/api/trainers</code></td>
            <td>API to request trainers</td>
            <td>API</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>GET</td>
            <td><code>/api/gyms</code></td>
            <td>API request gyms</td>
            <td>API</td>
            <td>✅</td>
        </tr>
    </tbody>
</table>