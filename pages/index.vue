<script setup lang="ts">
/* Vueuse */
import { useThrottleFn, useResizeObserver } from "@vueuse/core"
/* Indexeddb */
import { db } from "../src/db"
/* UI */
import { NButton, NIcon, NCarousel, NRadioGroup, NRadioButton } from "naive-ui"
/* Icons */
import { DriveFolderUploadFilled } from "@vicons/material"
import { ArrowBack, ArrowForward } from '@vicons/ionicons5'
import { FullscreenOutlined, FullscreenExitOutlined } from "@vicons/antd"

const fullscreenOn = ref<boolean>(false)
const filesUploaded = computed(() => imgsrcList.value.length > 0)
const imgsrcList = ref<string[]>([])
const currentIndex = ref<number>(0)
const canvasRef = ref<HTMLCanvasElement>()
const userimagesRef = ref<HTMLImageElement[]>([])
type ViewMode = 'fitfull' | 'fitvert' | 'fithor' | 'fitsquare'
const modes = [
    {
        value: 'fitfull',
        label: 'Fit entire'
    },
    {
        value: 'fitvert',
        label: 'Fit vertically'
    }, {

        value: 'fithor',
        label: 'Fit horizontally'
    }, {

        value: 'fitsquare',
        label: 'Fit squared'
    }
]
const currentMode = ref<ViewMode>('fitfull')

function toggleFullscreen() {
    fullscreenOn.value = !fullscreenOn.value
}

watch([currentMode, fullscreenOn, currentIndex], () => {
    drawImage()
})

onMounted(async () => {
    /* Redraw on resize */
    useResizeObserver(canvasRef, (entries) => {
        useThrottleFn(() => drawImage, 150)
    })
    /* Populate Images from Indexeddb if present */
    const indexeddbEmpty = await db.imageFile.count() == 0
    console.log('indexeddbEmpty: ', indexeddbEmpty);
    if (!indexeddbEmpty) {
        const files = await db.imageFile.toArray()
        const urls = files.map(file => URL.createObjectURL(file))
        imgsrcList.value = urls
        drawImage()
    }
})

async function drawImage() {
    if (!filesUploaded.value || !fullscreenOn.value) {
        return
    }
    const imgToDraw = new Image()
    imgToDraw.src = imgsrcList.value[currentIndex.value]
    await nextTick() // т.к. canvasref не успевает отрендериться (v-if)
    console.log(canvasRef.value);
    await new Promise(r => imgToDraw.onload = r)
    const { width: cWidth, height: cHeight } = canvasRef.value!.getBoundingClientRect()
    const iWidth = imgToDraw.width
    const iHeight = imgToDraw.height
    canvasRef.value!.width = cWidth
    canvasRef.value!.height = cHeight
    const isHorizontalOrientation = cWidth > cHeight
    const isHorizontalImage = iWidth > iHeight
    const canvasRatio = cWidth / cHeight
    const imageRatio = iWidth / iHeight
    canvasRef.value!.getContext('2d')!.clearRect(0, 0, cWidth, cHeight);
    switch (currentMode.value) {
        case "fitfull": {
            let newImgWidth;
            let newImgHeight;
            let startX = 0
            let startY = 0
            if (canvasRatio > imageRatio) {
                newImgHeight = cHeight
                newImgWidth = cHeight * imageRatio
                startX = Math.abs((cWidth - newImgWidth) / 2) // abs на случай, если изображение больше, чем canvas
            } else {
                newImgWidth = cWidth
                newImgHeight = cWidth / imageRatio
                startY = Math.abs((cHeight - newImgHeight) / 2) // abs на случай, если изображение больше, чем canvas
            }
            canvasRef.value!.getContext('2d')!.drawImage(
                imgToDraw,
                startX,
                startY,
                newImgWidth,
                newImgHeight
            );
        } break;
        case "fithor": {
            const newImgWidth = cWidth;
            const newImgHeight = cWidth / imageRatio;
            let startX = 0
            let startY = (cHeight - newImgHeight) / 2
            canvasRef.value!.getContext('2d')!.drawImage(
                imgToDraw,
                startX,
                startY,
                newImgWidth,
                newImgHeight
            );
        } break;
        case "fitvert": {
            const newImgWidth = cHeight * imageRatio;
            const newImgHeight = cHeight;
            let startX = (cWidth - newImgWidth) / 2
            let startY = 0
            canvasRef.value!.getContext('2d')!.drawImage(
                imgToDraw,
                startX,
                startY,
                newImgWidth,
                newImgHeight
            );
        } break;
        case "fitsquare": {
            const lowestSideSize = cWidth > cHeight ? cHeight : cWidth
            const lowestSide = cWidth > cHeight ? 'height' : 'width'
            let startX = lowestSide == 'width' ? 0 : (cWidth - lowestSideSize) / 2
            let startY = lowestSide == 'height' ? 0 : (cHeight - lowestSideSize) / 2
            // let startY = ;
            canvasRef.value!.getContext('2d')!.drawImage(
                imgToDraw,
                startX,
                startY,
                lowestSideSize,
                lowestSideSize
            );
        } break;

        default: {
        } break;
    }
}

async function onChangeFileInput(e: Event) {
    const target = e.target as HTMLInputElement
    if (!target.files) {
        return
    }
    const files = [...target.files].filter((file) => {
        return file.type === 'image/jpeg' || file.type === "image/png"
    })
    await db.imageFile.clear() // перед выбором новой папки, удалить старые файлы
    await db.imageFile.bulkAdd(files) // сохранить новые файлы
    console.group('Uploaded into Indexeddb:');
    console.log(await db.imageFile.toArray());
    console.groupEnd()
    files.forEach(file => {
        const url = URL.createObjectURL(file)
        imgsrcList.value.push(url)
    })
    await drawImage()
}

async function logIDB() {
    console.group('Files in Indexeddb:');
    console.log(await db.imageFile.toArray());
    console.groupEnd()
}
function onClickArrow(direction: 'left' | 'right') {
    if (direction == 'left') currentIndex.value > 0 ? currentIndex.value-- : currentIndex.value = imgsrcList.value.length - 1
    if (direction == 'right') currentIndex.value < imgsrcList.value.length - 1 ? currentIndex.value++ : currentIndex.value = 0
}
function updateIndex(index: number) {
    currentIndex.value = index
}
</script>

<template>
    <div class="pageWrapper">


        <header class="header">
            <img class="logo" src="/icons/pwa-192x192.png" alt="">

            <n-button icon-placement="left" type="primary">
                <template #icon>
                    <n-icon>
                        <DriveFolderUploadFilled />
                    </n-icon>
                </template>
                <template #default>
                    Upload
                    <label for="fileInput" class="fileInputLabel"></label>
                    <input type="file" ref="inputRef" id="fileInput" multiple="true"
                        webkitdirectory="true" accept="image/png, image/jpeg"
                        @change="onChangeFileInput">
                </template>
            </n-button>

            <n-button type="primary" @click="logIDB">
                Console.log all files from indexeddb
            </n-button>

            <n-button ghost type="primary" @click="toggleFullscreen">
                <n-icon>
                    <FullscreenOutlined v-if="!fullscreenOn" />
                    <FullscreenExitOutlined v-if="fullscreenOn" />
                </n-icon>
            </n-button>
        </header>


        <main>
            <Transition>
                <canvas v-if="fullscreenOn" ref="canvasRef"></canvas>
            </Transition>

            <Transition>
                <div class="arrows" v-if="fullscreenOn && filesUploaded">
                    <div class="arrows__item" @click="onClickArrow('left')"> ⬅️
                    </div>
                    <div class="arrows__item" @click="onClickArrow('right')"> ➡️
                    </div>
                </div>
            </Transition>

            <Transition>
                <div class="modes" v-if="fullscreenOn">
                    <n-radio-group name="radiobuttongroup1"
                        v-model:value="currentMode">
                        <n-radio-button v-for="{ label, value } in modes"
                            :value="value" :label="label" />
                    </n-radio-group>
                </div>
            </Transition>

            <h1 v-if="!filesUploaded">
                Новый диск тестовое
            </h1>
            <h1 v-if="filesUploaded && !fullscreenOn">
                Preview mode
            </h1>

            <!-- Fallback -->
            <p class="fallbackTxt" v-if="!filesUploaded">
                Upload some images first!
            </p>

            <!-- Naiveui-carousel component -->
            <n-carousel v-if="filesUploaded && !fullscreenOn"
                @update:current-index="$event => currentIndex = $event"
                :current-index="currentIndex" class="carousel"
                :direction="'horizontal'" :show-arrow="true" draggable
                :dot-type="'dot'" :dot-placement="'bottom'" :effect="'card'"
                :centered-slides="true" style="height: 200px;"
                @update-current-index="updateIndex">

                <!-- User images -->
                <img v-if="!fullscreenOn" v-for="(src, index) in imgsrcList"
                    :key="index" :src="src" alt="" ref="userimagesRef"
                    class="carousel-img">

                <!-- Custom arrows // CODE FROM NATIVEUI DOCS -->
                <template #arrow="{ prev, next }">
                    <div class="custom-arrow">
                        <button type="button" class="custom-arrow--left"
                            @click="prev">
                            <n-icon>
                                <ArrowBack />
                            </n-icon>
                        </button>
                        <button type="button" class="custom-arrow--right"
                            @click="next">
                            <n-icon>
                                <ArrowForward />
                            </n-icon>
                        </button>
                    </div>
                </template>

                <!-- Custom dots // CODE FROM NATIVEUI DOCS -->
                <template #dots="{ total, currentIndex, to }">
                    <ul class="custom-dots">
                        <li v-for="index of total" :key="index"
                            :class="{ ['is-active']: currentIndex === index - 1 }"
                            @click="to(index - 1)" />
                    </ul>
                </template>
            </n-carousel>

        </main>


    </div>
</template>

<style scoped lang="scss">
.pageWrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.header {
    position: sticky;
    height: 4rem;
    background-color: rgb(38, 38, 38);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
}

.logo {
    display: block;
    max-height: 100%;
    margin-right: auto;
    padding: 0.7rem;
}

#fileInput {
    display: none;
}

.fileInputLabel {
    background-color: red;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0%;
}

main {
    position: relative;
    flex: 1 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.773);
    z-index: 10;
}

.arrows {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    z-index: 20;

    &__item {
        font-size: 48px;
        margin: 0 10px;
        filter: hue-rotate(-55deg);

        &:hover {
            cursor: pointer;
            filter: hue-rotate(-55deg) brightness(120%);
        }
    }
}

.modes {
    margin: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    z-index: 20;
    background-color: rgb(216, 216, 216);
    border-radius: 3px;
    box-shadow: 0 0 5px -1px black;
}

.fallbackTxt {
    font-size: 24px;
    color: rgb(229, 229, 229);
}

h1 {
    text-align: center;
    pointer-events: none;
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    color: rgb(39, 39, 39);
}

.carousel-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.custom-arrow {
    display: flex;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    justify-content: space-between;
    width: 100%;
    padding: 0 0.5rem;
    /* background-color: red; */
}

.custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-arrow button:first-of-type {}

.custom-arrow button:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
}

.custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.711);
    box-shadow: 0 0 3px 0 black;
    padding: 0.5rem;
    border-radius: 1rem;
    pointer-events: none;
}

.custom-dots li {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.4);
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-dots li.is-active {
    background: #fff;
}

.v-enter-active {
    transition: all 0.3s ease-in;
}

.v-leave-active {
    transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>