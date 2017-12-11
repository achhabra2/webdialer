import React, { PureComponent } from 'react'

export default class Footer extends PureComponent {
  render() {
    return (
      <footer class="footer-distributed ui container">

        <div class="footer-right">

          <a href="https://www.facebook.com/achhabra1">
            <i class="facebook icon"></i>
          </a>
          <a href="https://www.linkedin.com/in/aman-chhabra-54884b24/">
            <i class="linkedin icon"></i>
          </a>
          <a href="https://github.com/achhabra2">
            <i class="github icon"></i>
          </a>

        </div>

        <div class="footer-left">

          <p class="footer-links">
            <a href="/about">About</a>
            ·
        <a href="/help">Help</a>
            ·
        <a href="/contact">Contact</a>
          </p>

          <p>Inquire App by Aman Chhabra &copy; 2017</p>
        </div>

      </footer>
    )
  }
}
