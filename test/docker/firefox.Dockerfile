FROM ubuntu:16.04

LABEL maintainer="LoveIsGrief"

USER root

RUN apt-get update -qqy
RUN apt-get -qqy --no-install-recommends install wget bzip2
RUN apt-get -qqy --no-install-recommends install firefox
RUN apt-get -qqy --no-install-recommends install openssh-server xauth
RUN echo "X11UseLocalhost no" >> /etc/ssh/sshd_config
RUN apt-get -qqy install gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly
RUN apt-get -qqy --no-install-recommends install git sudo

#=========
# Firefox
#=========
ARG FIREFOX_VERSION=latest
COPY firefox-installer.bash /tmp/
RUN bash /tmp/firefox-installer.bash $FIREFOX_VERSION

ARG USER=vjs
RUN useradd -m $USER
RUN echo "$USER ALL = (ALL) NOPASSWD: ALL" >> /etc/sudoers.d/${USER}

USER $USER

WORKDIR /home/$USER

RUN mkdir .ssh
COPY id_rsa .ssh/
COPY id_rsa.pub .ssh/authorized_keys
RUN sudo chown -R $USER:$USER .ssh
RUN chmod  0700 .ssh/
RUN chmod  0600 .ssh/*

ARG NODE_VERISON=6
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
RUN bash -lc "source ~/.profile && nvm install "$NODE_VERISON
RUN bash -lc "source ~/.profile && npm install -g grunt-cli"

# TODO move this to firefox-local.Dockerfile
#RUN git clone https://github.com/LoveIsGrief/videojs-externals.git
#WORKDIR /home/${USER}/videojs-externals
#RUN bash -lc 'source ~/.profile && nvm current && npm install'

