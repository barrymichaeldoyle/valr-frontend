# Barry's VALR Frontend Test

Welcome to my submission for the VALR Frontend Test.

## Quick Start

### Install CORS Extension for Chrome

Regardless of what approach you take, you will need to install the CORS extension for Chrome.

[CORS Extension for Chrome](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

Make sure you enable it before continuing.

### See Demo on Netlify

I deployed the app to Netlify, so you can see the demo here:

[Netlify Demo](https://valr-barry.netlify.app/)

### Run Locally

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm dev` to start the development server
4. Open [http://localhost:5173](http://localhost:5174) to view it in the browser.

## Price Data

The Blockchain.com exchange API doesn't return any data, even on their own site ([see here](https://exchange.blockchain.com/)). So I've used VALR's public API to get the price data for BTC and ETH (BCH is not supported on VALR).

If you do want to use the Blockchain.com exchange API, you will need to use your own API key that you can get by following the instructions [here](https://exchange.blockchain.com/api/).

Once you have the API key, you will need to copy the `.env.example` file to `.env` and add your API key to the `VITE_BLOCKCHAIN_API_KEY` variable.

By default, the app will use VALR's public API to get the price data if the `VITE_BLOCKCHAIN_API_KEY` is not set.

# Technical Decisions Reasoning

Firstly, I wanted to mention that I've taken a pragmatic approach in delivering on the requirements, showcasing my ability but also being mindful of not going overboard on spending time given this is a test.

## Tech Stack

### Vanilla CSS

Since the requirements were to avoid using component libraries, I just went cold turkey and wrote all the CSS myself. I tried to keep the .css files tightly coupled to the components they are styling, with a few shared styles in `src/main.css`. There are certainly more developer-friendly ways to do this, but I wanted to prove that I still know the fundamentals. That said, I stuck to using css classes and avoided element ids altogether.

I implemented `stylelint` to help keep my CSS consistent.

### Linting/Formatting

In every project I do, I like to setup `prettier` and `eslint` to help keep my code consistent. I generally just add rules as I go to ensure that my code style is consistent. I'm not married to any particular style, but I do believe that consistency enforced in codebases leads to less overhead for developers to think about while contributing to a codebase.

Many code review nits can be avoided by adding more explicit rules to the linting/formatting tools.

### Testing

I just added a few unit tests to my utility functions to demonstrate my familiarity with testing. I used `vitest` for the tests.

If I had more time, I'd consider adding more tests to my components and api calls.

I would also consider adding playwright tests for e2e smoke tests.

### React Router

I figured routing would be a neater way to handle navigating to the block details page as opposed to using some other state management solution.

### React Query

For data fetching, I used `react-query`.

I really like `react-query` for its consistent approach when fetching data. It gives developers an ergonomic way to handle loading and error states, caching, refetching, built-in abort controllers etc.

Lastly, they also have nice devtools, which help a lot with building out the UI for error & loading states and other edge cases.

### Big.js

Since there was quite a bit of math involved in this project, I played it safe and used `big.js` in all my calculations to handle the precision of the numbers.

### Lucide Icons

I used `lucide-react` for the icons. I really like the icons and the fact that they are open source.

## Data Fetching

I'll discuss how I derived the data from the API responses available and discuss some pros and cons of my approach.

### Home Page

I've already addressed the pricing data [above](#price-data). TLDR: I used VALR's public API since the blockchain.com API doesn't return any data.

For the latest blocks, I was able to get the `height`, `hash`, `mined` (time formatted) values from the `https://blockchain.info/blocks` endpoint using the current timestamp as a parameter.

I was able to get additional information (specifically the block `size`) for all the latest blocks by passing those heights to the `https://api.blockchain.info/haskoin-store/btc/block/heights` endpoint. I excluded the `tx` data using the `&notx=true` parameter to keep the response size down. My assumption was that this would be a much cheaper operation to perform than fetching all the transaction data for each block.

Fortunately, I noticed the `&notx=true` parameter approach still returned the first `tx` hash for each block. I needed this to get the `miner` value. I took that `tx` hash and called the `https://blockchain.info/rawtx` endpoint to get the single transaction data for each block item. It felt pretty dirty to do this, but I feel like this call is much cheaper than all the other options I experimented with.

After some digging, I found a `pools.json` file in a public GitHub repo. I created a function to decode the `coinbase` script and matched that to the `pools.json` file to get the respective `miner` names for my block items.

> I did notice that the `pools.json` file that I found is quite outdated. So every time I came across an unknown miner, I would look at the decoded `coinbase` script myself. If I was able to identify a miner from the script, I'd look up their website and add it to the `pools.json` file. In a perfect world you would probably add this to a logging service and take action on unknown miners to add it to a database instead of relying purely on a static file. I did load the static file using react-query so it would be a simple swap-out if I ever needed to make a fetch endpoint for that data.

### Block Details Page

When it came to the block details page, I could get almost all the information I needed from the `https://blockchain.info/rawblock` endpoint. For some of the fields I had to do some math to get the correct values and I validated that by checking multiple different blocks on the blockchain.info site to ensure my calculated values were correct.

For the miner, I was able to reuse my function from the home page.

Confirmations required me to know the height of the latest mined block. I was able to get this from the `https://blockchain.info/latestblock` endpoint.

For the transactions on the details page, I was also able to derive all those values from my raw block's transactions data. I passed my calculated confirmations value to the transactions component to be displayed for each item there. I wasn't sure if the confirmations value for the block was always the same for all the actual transaction items, that was just an assumption I made. I wasn't able to validate that assumption since blockchain.info doesn't show confirmations data for each transaction.

## Other Implementations

### Accessibility

I made sure to use semantic HTML and aria attributes where appropriate to aid with improving `a11y`. I also ensured that everything interactive on the home page was keyboard accessible. If I was working on this more seriously I would look into implementing a11y linting rules and plugins as well as look at checks during component testing for a11y violations.

### Mobile Responsiveness

I made sure to show off that I can build responsive layouts by making the home page responsive to mobile. The details page is semi responsive (not fully responsive to mobile), I didn't want to spend too much time on it since I'm not sure if it's a requirement.

## Out Of Scope

### Virtualization

The transactions list on the details page is not virtualized. It's fine for the demo, but I would definitely virtualize it if I was working on this more seriously. Alternatively, client side pagination would also improve the performance of the page.

---

## Thanks for checking out my submission! 🙏

I appreciate you taking the time to check out my submission. I hope you like it!
