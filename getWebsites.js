import axios from "axios";
import cheerio from "cheerio";

const getWebsites = async () => {
  const { data: html } = await axios.get("https://whatcms.org/");

  const data = [];
  const $ = cheerio.load(html);
  $(".table tbody tr").each((i, element) => {
    const technology = $(element).find("td:nth-child(2)").text();
    const collectable = technology?.includes("WordPress") || technology?.includes("Magento") || technology?.includes("Shopify") || technology?.includes("PrestaShop") || technology?.includes("Joomla");

    if (collectable) {
      const info = { category: "wordpress" };
      if (technology.includes("WooCommerce")) {
        info.category = "woocommerce";
      } else if (technology.includes("PrestaShop")) {
        info.category = "prestashop";
      } else if (technology.includes("Magento")) {
        info.category = "magento";
      } else if (technology.includes("Elementor")) {
        info.category = "elementor";
      } else if (technology.includes("Joomla")) {
        info.category = "joomla";
      } else if (technology.includes("Shopify")) {
        info.category = "shopify";
      }

      info.website = $(element).find("td:nth-child(1)").html();
      data.push(info);
    }
  });
  return data;
};

export default getWebsites;
