<template>
	<div class="lines_wrapper">
		<div v-for="line in lines" class="line" :style="`height: ${line.height / 20}%;`" />
	</div>
</template>

<script setup>
const lastLineUsed = ref(0);
const lastColorUsed = ref(0);
const colors = ["magenta", "green", "blue", "orange", "purple"];
let linesInterval;

const lines = computed(() => {
	const qty = 15;
	let out = [];
	const thirdpoint = Math.floor(qty / 2);
	const maxHeight = 200;
	const minHeight = 10;

	for (let i = 0; i < qty; i++) {
		if (i <= thirdpoint) {
			const height = maxHeight - ((maxHeight - minHeight) / thirdpoint) * i;
			for (let j = 0; j < i; j++) {
				out.push({ height });
			}
		} else {
			const height = minHeight + ((maxHeight - minHeight) / (qty - thirdpoint)) * (i - thirdpoint);
			for (let j = 0; j < qty - i; j++) {
				out.push({ height });
			}
			out.push({ height });
		}
	}

	return out;
});

function chooseLine() {
	const linesQty = document.querySelectorAll(".lines_wrapper .line").length;
	let lineNum = Math.ceil(Math.random() * linesQty);

	if (linesQty === 0) {
		return "stop";
	}

	if (lineNum > lastLineUsed.value - 20 && lineNum < lastLineUsed.value + 20) {
		lineNum = chooseLine();
	}

	lastLineUsed.value = lineNum;

	return lineNum;
}

function chooseColor() {
	const colorNum = Math.floor(Math.random() * colors.length);
	let color = colors[colorNum];

	if (color === lastColorUsed.value) {
		color = chooseColor();
	}

	return color;
}

onMounted(() => {
	linesInterval = setInterval(() => {
		const chosenLine = chooseLine();
		const chosenColor = chooseColor();

		if (chosenLine === "stop") {
			clearInterval(linesInterval);
			return;
		}

		const line = document.querySelector(`.lines_wrapper .line:nth-child(${chosenLine})`);

		line.className = "line";
		line.classList.add(chosenColor);
		line.classList.add("c");

		setTimeout(() => {
			line.classList.remove("c");
		}, 10);
	}, 200);
});

onBeforeUnmount(() => {
	clearInterval(linesInterval);
});
</script>

<style lang="scss" scoped>
.lines_wrapper {
	position: absolute;
	width: 100%;
	left: 0;
	height: 100%;
	flex: 0 0 100%;
	top: 0;
	z-index: 1;
	display: flex;
	flex-flow: column nowrap;
}

.line {
	border-bottom: 2px solid #000;
	position: relative;
	width: 100%;
	min-height: 15px;
	max-height: 200px;
	transition: background-color 3s ease 0.5s;

	&.c {
		transition: background-color 0s;

		&.blue {
			background-color: var(--blue);
		}
		&.green {
			background-color: var(--green);
		}
		&.orange {
			background-color: var(--orange);
		}
		&.purple {
			background-color: var(--purple);
		}
		&.magenta {
			background-color: var(--magenta);
		}
	}
}
</style>
