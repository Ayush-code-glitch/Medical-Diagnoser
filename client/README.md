# SwasthyaAI frontend

The frontend is a working prototype of the SwasthyaAI symptom-analysis experience. It combines symptom input, contextual patient information, explainable assessment logic, urgency detection, and a health-history review flow.

## Run locally

```bash
npm install
npm run dev
```

## Notes

- This prototype intentionally focuses on a safety-first, explainable health guidance experience rather than a single disease prediction model.
- The app stores recent assessments in browser local storage so the history view remains available without a backend.
- This public showcase runs entirely in the visitor's browser. It has no online accounts or shared cloud database; each browser has its own assessment history.
- Use fictional data only. Do not enter real patient information.

## Free public showcase deployment

The frontend can be deployed as a static site without hosting the Node.js, MySQL, or Python prototype services.

1. Push the `client` project to a public GitHub repository.
2. Import the repository into Vercel and set the project root to the repository root.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Deploy. Vercel provides a public HTTPS URL.

The `vercel.json` rewrite keeps client-side routes such as `/diagnosis` and `/history` working when opened directly. The free hosting plan and its usage limits are subject to the provider's current terms.
