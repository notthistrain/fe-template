Name: %{name}
Version: %{version}
Release: %{?release}
Summary: %{name} etc.
License: notthistrain
%description
%{name}

%install
mkdir -p ${RPM_BUILD_ROOT}/tmp/%{name}
cp -f %{name}-%{version}.tar ${RPM_BUILD_ROOT}/tmp/%{name}

%post
docker ps -aq --filter "name=%{name}" | xargs -r docker rm -f || true
docker images -q %{name}:%{version} | xargs -r docker rmi -f || true
docker load -i /tmp/%{name}/%{name}-%{version}.tar
docker run --name=%{name} --net=host --restart=always -d %{name}:%{version}

# 卸载前执行
%preun

# 卸载后文件删除完成后触发
%postun
docker ps -aq --filter "name=%{name}" | xargs -r docker rm -f || true
docker images -q %{name}:%{version} | xargs -r docker rmi -f || true

# 规定那些文件必须放入安装程序中，如果没有就报错，清单中的文件将在卸载时被删除。
%files
%defattr(-,root,root)
/tmp/%{name}/%{name}-%{version}.tar
%config(noreplace)