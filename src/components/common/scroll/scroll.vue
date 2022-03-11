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
    created(){
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
        });

        // 2.监听滚动的位置
        if(this.bstype === 2 || this.bstype === 3){
            this.scroll.on('scroll', (position) => {
            // console.log(this.bstype)
            // console.log(position)
            this.$emit('scroll', position)
            })
        };

        // 3.监听scroll到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp', () =>{
                // console.log('监听滚动到底部')
                this.$emit('pullingUp')
            })
        };
    },
    methods: {
        // 滚动
        scrollTo(x, y, time = 300) {
            this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
        },
        // 刷新
        refresh() {
            // console.log('123')
            this.scroll && this.scroll.refresh && this.scroll.refresh()
        },
        // 上拉加载
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
        },
        getScrollY() {
            // console.log(this.scroll)
            return this.scroll ? this.scroll.y : 0
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
