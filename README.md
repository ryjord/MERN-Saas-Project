# MERN Admin Dashboard

An admin dashboard for a fictional e-commerce business: sales overviews, product and customer
tables, transaction history with server-side pagination and sorting, a geography breakdown and
per-user performance pages. React and Material UI on the front, Express and MongoDB behind it.

**Live:** https://mern-saas-project-frontend.vercel.app/

## Provenance

This was built by following a third-party MERN admin dashboard tutorial, and most of what is here
is not mine. The application structure, the Mongoose models, the `scenes/` layout and the sample
datasets all come from that tutorial.

That is most of the repository by volume. Of roughly 39,000 lines, about 36,500 are two files
carried over unchanged: `server/data/index.js` (22,977 lines of sample records, still carrying
their original MongoDB ObjectIds) and `client/src/state/geoData.js` (13,548 lines of world
GeoJSON). The application itself is the remaining ~2,700 lines.

What I did add: deploying both halves to Vercel as separate serverless projects and the CORS and
environment handling that needed, a sort-and-filter control on the products page, date-range
handling on the daily view, and the seed script described below. It is a learning exercise, kept
public as a record of that rather than presented as original product work.

## What it does

- **Dashboard** — headline sales figures, a monthly sales line chart, a category breakdown pie and
  a table of recent transactions
- **Products** — product grid with expandable cards, plus sorting and filtering
- **Customers and Transactions** — Data Grid tables; transactions are paginated, sorted and
  searched server-side
- **Geography** — customer distribution on a choropleth world map
- **Overview, Daily, Monthly, Breakdown** — sales charts over different ranges, with a date-range
  picker on the daily view
- **Admin and Performance** — admin listing and per-user affiliate sales
- **Light and dark themes**, toggled from the navbar and held in Redux

### Honest limits

- **There is no authentication.** The app reads a hardcoded user id. There is no login and nothing
  is private.
- The data is the tutorial's fictional dataset. None of it reflects a real business.
- There are no tests, and no test files were ever written. The unused testing libraries Create
  React App ships by default have been removed rather than left in as decoration.

## Stack

**Client** — React 18 (Create React App), Redux Toolkit with RTK Query, React Router 6, Material UI
5 with MUI X Data Grid, Nivo charts, `react-datepicker`.

**Server** — Express 5, Mongoose 8 over MongoDB, helmet, morgan, cors, and `country-iso-2-to-3` to
map country codes for the map.

Both halves deploy to Vercel as separate projects.

## Running it locally

You need Node 20+ and a MongoDB connection string; a free Atlas cluster is enough.

### Server

```bash
cd server
npm install
cp .env.example .env      # then set MONGO_URL
npm run seed              # loads the sample dataset, safe to re-run
npm run dev               # http://localhost:9000
```

`npm run seed` skips any collection that already has documents, so it will not duplicate data.

### Client

```bash
cd client
npm install
echo "REACT_APP_API_URL=http://localhost:9000" > .env.local
npm start                 # http://localhost:3000
```

Without `REACT_APP_API_URL` the client talks to the deployed API instead, which is enough for
front-end work.

## API

| Route | Returns |
|---|---|
| `GET /general/user/:id` | One user |
| `GET /general/dashboard` | Dashboard totals, recent transactions and monthly stats |
| `GET /client/products` | Products with their stats |
| `GET /client/customers` | All customers |
| `GET /client/transactions` | Transactions, paginated and sortable |
| `GET /client/geography` | Customer counts by country |
| `GET /sales/sales` | Overall sales statistics |
| `GET /management/admins` | Admin users |
| `GET /management/performance/:id` | Affiliate sales for one user |

## License

The code I wrote is MIT licensed — see [LICENSE](LICENSE). The tutorial-derived application code
and the datasets remain the work of their original author.
