# Future Expansion Guardrails

Do not add these features directly into v1 without a separate architecture/security review:

1. Client login / authentication
2. Health questionnaire submission from this website
3. Health data storage
4. Chat with persistent message history
5. Payment
6. Meal-plan generation or Mahdi Diet API integration
7. AI coaching

When these become necessary, prefer a separated application boundary such as:

- `www.domain` → public website
- `app.domain` → authenticated client portal
- `api.domain` → controlled service/API layer

The public website should remain fast, mostly static, SEO-friendly and low-risk.
