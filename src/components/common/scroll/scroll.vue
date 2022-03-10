<template>
    <div class="scrollwrap" ref="scrollwrap">
        <div class="scrollcontent">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: "scroll",
    props:{
        bstype:{
            type: Number,
            default: 0
        },
        pullUpLoad:{
            type: Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:{}
        }
    },
    mounted(){
        // 1.创建scroll对象
        // 这样获取元素，不太好
        // console.log(document.querySelector('.scrollwrap'))
        this.scroll = new BScroll(this.$refs.scrollwrap,{
            // 2.XX版本，要设置这个属性
            observeDOM: true,
            // 点击事件保持响应
            click:true,
            // 是否监听滚动
            probeType:this.bstype,
            // 监听上拉事件
            pullUpLoad: this.pullUpLoad
        })

        // 2.监听滚动的位置
        if(this.bstype === 2 || this.bstype === 3){
            this.scroll.on('scroll', (position) => {
            // console.log(this.bstype)
            // console.log(position)
            this.$emit('scroll', position)
            })
        }

        // 3.监听scroll到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp', () =>{
                // console.log('监听滚动到底部')
                this.$emit('pullingUp')
            })
        }
    },
    methods: {
        refresh() {
            this.scroll && this.scroll.refresh && this.scroll.refresh()
            // this.scroll && this.scroll.refresh && this.scroll.refresh()
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
		    // this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
        }
    },
    watch: {
		data() {
            setTimeout(this.refresh, 20)
        }
    }
}
</script>

<style lang="scss" scoped>
// .scrollwrap{
//     .scrollcontent{

//     }
// }
</style>
