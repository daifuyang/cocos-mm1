import { _decorator, Component, Sprite, SpriteFrame, Rect, Vec2, Texture2D } from 'cc';
const { ccclass } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
    private sprite: Sprite = null;

    private readonly gridSize: Vec2 = new Vec2(4, 4);  // 4x4 的网格
    private readonly frameSize: Vec2 = new Vec2(32, 32); // 每个格子的尺寸是 32x32 像素

    start() {
        // 自动获取当前节点上的 Sprite 组件
        this.sprite = this.getComponent(Sprite);

        console.log("CharacterController initialized.")
        
        if (this.sprite) {
            // 初始化时显示角色朝向下（第2行）的第1个动作（第1列）
            this.setSpriteFrame(1, 0);
        } else {
            console.error("No Sprite component found on this node.");
        }
    }

    setSpriteFrame(direction: number, actionIndex: number) {
        if (!this.sprite) {
            console.error("Sprite component is not available.");
            return;
        }

        // 获取原始纹理
        const originalSpriteFrame = this.sprite.spriteFrame;
        const texture = originalSpriteFrame.texture as Texture2D;

        // 计算帧的 Rect
        const rect = new Rect(
            actionIndex * this.frameSize.x,
            (this.gridSize.y - 1 - direction) * this.frameSize.y,
            this.frameSize.x,
            this.frameSize.y
        );

        // 创建新的 SpriteFrame 并应用到 Sprite 上
        const newSpriteFrame = new SpriteFrame();
        newSpriteFrame.texture = texture;
        newSpriteFrame.rect = rect;

        this.sprite.spriteFrame = newSpriteFrame;
    }

    // 示例：切换方向和动作
    changeToLeftAction() {
        this.setSpriteFrame(2, 1);  // 左（第3行）的第2个动作（第2列）
    }

    changeToUpAction() {
        this.setSpriteFrame(0, 2);  // 上（第1行）的第3个动作（第3列）
    }

    changeToDownAction() {
        this.setSpriteFrame(1, 0);  // 下（第2行）的第1个动作（第1列）
    }

    changeToRightAction() {
        this.setSpriteFrame(3, 3);  // 右（第4行）的第4个动作（第4列）
    }
}
