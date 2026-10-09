# Architecture rules
- Portfolio events and Shop products live only in `src/data/portfolioData.ts` and `src/data/productData.ts`; pages map over them and dynamic templates (/work/:eventId, /shop/:productId) look up by id, so new content needs only a data entry.
- Ordering bypasses payment gateways: the cart builds a pre-filled WhatsApp message, so no checkout or shipping calculation code exists.
- Keep cart access on commerce routes (/shop, /cart) only; the shared navigation contains no account, search, region or collection entry points.
