<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12">

          <b-alert
            show
            variant="danger">
            <strong>Caution!</strong>
              Your device do not support inertial sensors, please open this page on your mobile devices.
          </b-alert>

          <b-card border-variant="primary"
            header="Web Logger"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center">

            <strong>
              ENTER PINS
            </strong>

            <b-input-group size="lg" prepend="1823">
              <b-form-input></b-form-input>
            </b-input-group>
          </b-card>

          <div class="panel panel-primary">

            <ul class="list-group">
              <li class="list-group-item">
                <div class="alert alert-success" role="alert">
                  <p class="text-center">PIN Counts = <span id="pin-count">0</span>, Total PINs = <span id="pin-total">#</span></p>
                </div>
              </li>

              <li class="list-group-item">
                <label for="pin-progress">Overall Progress:</label>
                <div class="progress">
                  <div id="pin-progress" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="50" style="min-width: 2em;">
                    <span class="sr-only">0%</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div class="footer">
        <p>
          <a href="https://herculas.cn" target="_blank">@Wurahara</a>
        </p>
      </div>

    </div>

    <!-- Startup Modal -->
    <div class="modal fade" id="startupModal" tabindex="-1" role="dialog" aria-labelledby="startupModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title text-center" id="startupModalLabel">欢迎使用！</h4>
          </div>
          <div class="modal-body">
            <p>非常感谢您抽出宝贵时间参与手机加速度传感器实验的数据采集！在开始之前请阅读以下注意事项：</p>
            <ul>
              <li>请在下方的输入框中输入您的昵称，仅作为身份标示。</li>
              <li>数据录入开始后，请按照提示在输入框中输入<strong>4位数字</strong>。</li>
              <li>如果不小心输错数字，请<strong>不要按删除键</strong>，继续输入错误的数字，直到满<strong>4位</strong>后自动清空，再次重新录入正确数字。</li>
              <li>在录入过程中，请<strong>避免大幅度移动手机</strong>，用自然的姿势完成数据录入。</li>
            </ul>
            <div class="form-group">
              <p></p>
              <label for="username">请输入您的昵称</label>
              <input type="text" class="form-control" id="username" placeholder="中英文均可，长度不超过16个字符" maxlength="16">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
          </div>
        </div>
      </div>

    </div>
    <!-- End Modal -->

    <!-- Over Modal -->
    <div class="modal fade" id="overModal" tabindex="-1" role="dialog" aria-labelledby="overModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="overModalLabel">恭喜！</h4>
          </div>
          <div class="modal-body">
            <p>您已成功录入所有样本！感谢您的支持！</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">好的</button>
            <button type="button" class="btn btn-primary" id="enter-again-btn">再次录入</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>

</template>

<script>
export default {
  name: 'index'
}
</script>
