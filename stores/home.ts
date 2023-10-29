import { defineStore } from "pinia";
import { rowToJSONForMarkdown, getFileType } from "@/composables/useDBHelper";

export const useHomePageStore = defineStore("homepage", () => {
	const { DEBUG_HOME } = useRuntimeConfig().public;

	const { locale } = useI18n();

	const fetchedCarousels = ref([]);

	const fetchedData = reactive({
		fetchedCarousels,
	});

	const tables: any = {
		carousels: "212454",
	};

	async function fetchCarousels() {
		const carouselsTable = await useBaserowTable(tables.carousels);

		if (!carouselsTable || carouselsTable.length === 0) {
			console.warn("useAboutStore() : Unable to fetch Artist Statement.", carouselsTable);
			return;
		}

		console.table(carouselsTable);

		fetchedCarousels.value = carouselsTable
			.map((row: any) => {
				const titleI18n = mapColumnToLanguages(row, "Title");
				const ctaI18n = mapColumnToLanguages(row, "CTA");
				const images = row.Images.map((img) => img.url);

				return {
					id: slugify(row["Title EN"]),
					title: titleI18n,
					cta: ctaI18n,
					images,
				};
			})
			.filter(Boolean);
	}

	if (fetchedCarousels.value.length === 0) {
		if (DEBUG_HOME === "true") {
			console.debug("No carousels, calling fetchCarousels()");
		}
		fetchCarousels();
	}

	const carousels = computed(() => {
		return fetchedData.fetchedCarousels.map((carousel: any) => {
			const cOut = { ...carousel };
			if (cOut.title) {
				cOut.title = cOut.title[locale.value] || cOut.title.en;
			}
			if (cOut.cta) {
				cOut.cta = cOut.cta[locale.value] || cOut.cta.en;
			}
			return cOut;
		});
	});

	return { carousels };
});